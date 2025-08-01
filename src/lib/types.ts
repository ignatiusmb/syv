import type { Component } from 'svelte';

export type Demand<T> = {
	[K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T] extends [never]
	? [T?]
	: [T];

export interface LazyComponent<T extends Component<any, any>> {
	(): Promise<{ default: T }>;
}

// ---- Syv ----

export interface SyvOptions {
	'syv:anchor'?: Element | Document;
	'syv:intro'?: boolean;
}

type CSSValue = false | number | 'none' | SyvCSS.GlobalValues;
export type SyvStyles<T extends string> = Record<string, CSSValue> & {
	[K in T as `--${K}`]?: CSSValue;
};

// ---- CSS ----

type Flexible<Union extends T, T = string> = Union | (T & Record<never, never>);
namespace SyvCSS {
	export type GlobalValues = Flexible<'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset'>;
}

// ---- Props ----
export type { Props as MetaHead } from './core/MetaHead.svelte';
