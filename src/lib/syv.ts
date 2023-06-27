import type { ComponentType, SvelteComponent } from 'svelte';
import type { Demand, LazyComponent, SyvOptions } from './types.js';
import { ntv } from 'mauss/std';

let component: SvelteComponent;
let events: Array<() => void> = [];

function purge() {
	events.forEach((destroy) => destroy());
	component && component.$destroy();

	events = [];
}

// ---- exposed ----

export function mount<T extends SvelteComponent>(
	Component: ComponentType<T>,
	...[demanded]: Demand<SyvOptions<T>>
) {
	purge(); // destroy here so it keeps the out transition

	const options = Object.assign({ 'syv:intro': true }, demanded);
	const props = Object.keys(options).filter((k) => !k.includes(':'));
	component = new Component({
		intro: options['syv:intro'],
		target: options['syv:anchor'] || document.body,
		// @ts-expect-error - valid after T exists
		props: ntv.pick(props)(options),
	});

	for (const [k, v] of Object.entries(options)) {
		if (!k.startsWith('on:')) continue;
		const event = k.slice('on:'.length);
		// @ts-expect-error - v is guaranteed a function
		events.push(component.$on(event, v));
	}
}

export function load<T extends SvelteComponent>(
	loader: LazyComponent<T> | ReturnType<LazyComponent<T>>,
	...[options]: Demand<SyvOptions<T>>
) {
	const loaded = typeof loader !== 'function' ? loader : loader();
	// @ts-expect-error - only passing `options` to `mount`
	loaded.then(({ default: Component }) => mount(Component, options));
}
