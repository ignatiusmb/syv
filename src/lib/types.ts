import type { ComponentEvents, ComponentProps, ComponentType, SvelteComponent } from 'svelte';

export type Exposed<
	T extends SvelteComponent,
	Props = ComponentProps<T>,
	Events = ComponentEvents<T>
> = (Props extends { [key: string]: never } ? {} : Props) & {
	[K in keyof Events as `on:${string & K}`]: Events[K];
};

export interface LazyComponent<T extends SvelteComponent> {
	(): Promise<{ default: ComponentType<T> }>;
}
