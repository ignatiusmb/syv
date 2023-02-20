import type { ComponentType, SvelteComponent } from 'svelte';
import type { Exposed, LazyComponent } from '../../types';
import { ntv } from 'mauss/std';

let component: SvelteComponent;

function purge() {
	component && component.$destroy();
}

export function load<T extends SvelteComponent>(loader: LazyComponent<T>, exposed?: Exposed<T>) {
	loader().then(({ default: Dialog }) => mount(Dialog, exposed));
}

export function mount<T extends SvelteComponent>(Dialog: ComponentType<T>, exposed?: Exposed<T>) {
	purge(); // destroy here so it keeps the out transition

	const props = Object.keys(exposed || {}).filter((k) => !k.startsWith('on:'));
	component = new Dialog({
		intro: true,
		target: document.body,
		// @ts-expect-error - too hard for TS
		props: ntv.pick(props)(exposed || {}),
	});
}
