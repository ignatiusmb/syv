import type { Flexible } from 'mauss/typings';
import type { ComponentType, SvelteComponent } from 'svelte';

export interface AnyComponent {
	new (...args: any): typeof SvelteComponent;
}

export interface AnyLazyComponent {
	(): Promise<{ default: AnyComponent }>;
}

export type Demand<T> = {
	[K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T] extends [never]
	? [T?]
	: [T];

export interface LazyComponent<T extends SvelteComponent> {
	(): Promise<{ default: ComponentType<T> }>;
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
