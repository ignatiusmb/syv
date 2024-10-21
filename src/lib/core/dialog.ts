import type { Component, ComponentProps } from 'svelte';
import type { Demand, LazyComponent, SyvOptions } from '../types.js';
import { mount as create, unmount } from 'svelte';

let instance: ReturnType<typeof create>;

// ---- exposed ----

export function mount<T extends Component<any, any>>(
	component: T,
	...[demanded]: SyvOptions & Demand<ComponentProps<T>>
) {
	instance && unmount(instance); // destroy here so it keeps the out transition

	const internal = Object.assign({ 'syv:intro': true }, demanded);
	if (demanded) delete demanded['syv:intro'], delete demanded['syv:anchor'];
	instance = create(component, {
		intro: internal['syv:intro'],
		target: internal['syv:anchor'] || document.body,
		props: demanded, // pass the object as-is to preserve reactivity
	});
}

export function load<T extends Component<any, any>>(
	loader: LazyComponent<T> | ReturnType<LazyComponent<T>>,
	...[options]: Demand<SyvOptions & ComponentProps<T>>
) {
	const loaded = typeof loader !== 'function' ? loader : loader();
	// @ts-expect-error - only passing `options` to `mount`
	loaded.then(({ default: Comp }) => mount(Comp, options));
}
