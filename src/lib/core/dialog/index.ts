import type { ComponentEvents, ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { ntv } from 'mauss/std';

// TODO array of dialog
let component: SvelteComponent;

function purge() {
	component && component.$destroy();
}

export function mount<T extends SvelteComponent, Events = ComponentEvents<T>>(
	Dialog: ComponentType<T>,
	exposed?: ComponentProps<T> & { [K in keyof Events as `on:${string & K}`]: Events[K] }
) {
	purge(); // destroy here so it keeps the out transition

	const props = Object.keys(exposed || {}).filter((k) => !k.startsWith('on:'));
	component = new Dialog({
		intro: true,
		target: document.body,
		// @ts-expect-error - too hard for TS
		props: ntv.pick(props)(exposed || {}),
	});
}
