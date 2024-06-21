import type { Flexible } from 'mauss/typings';
import type { SvelteComponent } from 'svelte';

export interface AnyComponent<T extends SvelteComponent = SvelteComponent> {
	new (...args: any): T;
}

export type Demand<T> = {
	[K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T] extends [never]
	? [T?]
	: [T];

export interface LazyComponent<T extends SvelteComponent> {
	(): Promise<{ default: AnyComponent<T> }>;
}

// ---- Syv ----

export interface SyvOptions {
	'syv:anchor'?: Element | Document;
	'syv:intro'?: boolean;
}

export type SyvStyles<T extends string> = {
	[K in T as `--${K}`]?: 'none' | number | SyvCSS.GlobalValues;
};

// ---- CSS ----

namespace SyvCSS {
	export type GlobalValues = Flexible<'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset'>;
}
