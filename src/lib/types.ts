import type { ComponentEvents, ComponentProps, ComponentType, SvelteComponent } from 'svelte';

export type Exposed<T extends SvelteComponent, Events = ComponentEvents<T>> = ComponentProps<T> & {
	[K in keyof Events as `on:${string & K}`]: Events[K];
};

export interface LazyComponent<T extends SvelteComponent> {
	(): Promise<{ default: ComponentType<T> }>;
}
