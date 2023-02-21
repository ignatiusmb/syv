import type { ComponentType, SvelteComponent } from 'svelte';
import type { Exposed, LazyComponent } from './types';
import { ntv } from 'mauss/std';

let component: SvelteComponent;
let events: Array<() => void> = [];

export function load<T extends SvelteComponent>(loader: LazyComponent<T>, exposed?: Exposed<T>) {
	loader().then(({ default: Comp }) => mount(Comp, exposed));
}

export function mount<T extends SvelteComponent>(Comp: ComponentType<T>, exposed?: Exposed<T>) {
	purge(); // destroy here so it keeps the out transition

	exposed = exposed || ({} as NonNullable<typeof exposed>);
	const props = Object.keys(exposed).filter((k) => !k.startsWith('on:'));
	component = new Comp({
		intro: true,
		target: document.body,
		// @ts-expect-error - valid after T exists
		props: ntv.pick(props)(exposed),
	});

	for (const [k, v] of Object.entries(exposed)) {
		if (!k.startsWith('on:')) continue;
		events.push(component.$on(k, v));
	}
}

export function purge() {
	events.forEach((destroy) => destroy());
	component && component.$destroy();

	events = [];
}
