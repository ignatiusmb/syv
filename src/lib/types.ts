import type * as ST from 'svelte';

export interface AnyComponent {
	new (...args: any): ST.SvelteComponentTyped;
}

export interface AnyLazyComponent {
	(): Promise<{ default: AnyComponent }>;
}

export type Demand<T> = {
	[K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T] extends [never]
	? [T?]
	: [T];

export type Exposed<
	T extends ST.SvelteComponent,
	Props = ST.ComponentProps<T>,
	Events = ST.ComponentEvents<T>
> = (Props extends { [key: string]: never } ? {} : Props) & {
	[K in keyof Events as `on:${string & K}`]?: (ev: Events[K]) => void;
};

export interface LazyComponent<T extends ST.SvelteComponent> {
	(): Promise<{ default: ST.ComponentType<T> }>;
}

// ---- Syv ----

export type SyvOptions<T extends ST.SvelteComponent> = Exposed<T> & {
	'syv:anchor'?: ST.ComponentConstructorOptions['target'];
	'syv:intro'?: ST.ComponentConstructorOptions['intro'];
};
