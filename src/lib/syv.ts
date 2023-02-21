import type { ComponentType, SvelteComponent } from 'svelte';
import type { Demand, LazyComponent, SyvOptions } from './types';
import { ntv } from 'mauss/std';

let component: SvelteComponent;
let events: Array<() => void> = [];

export function load<T extends SvelteComponent>(
	loader: LazyComponent<T>,
	...[options]: Demand<SyvOptions<T>>
) {
	// @ts-expect-error - only passing `options` to `mount`
	loader().then(({ default: Comp }) => mount(Comp, options));
}

export function mount<T extends SvelteComponent>(
	Comp: ComponentType<T>,
	...[options]: Demand<SyvOptions<T>>
) {
	purge(); // destroy here so it keeps the out transition

	options = (options || { 'syv:intro': true }) as SyvOptions<T>;
	const props = Object.keys(options).filter((k) => !k.includes(':'));
	component = new Comp({
		intro: options['syv:intro'],
		target: options['syv:anchor'] || document.body,
		// @ts-expect-error - valid after T exists
		props: ntv.pick(props)(options),
	});

	for (const [k, v] of Object.entries(options)) {
		if (!k.startsWith('on:')) continue;
		events.push(component.$on(k, v));
	}
}

export function purge() {
	events.forEach((destroy) => destroy());
	component && component.$destroy();

	events = [];
}
