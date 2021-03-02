import { SvelteComponentTyped } from 'svelte';
import { Writable } from 'svelte/store';
// essentials
export class Dialog extends SvelteComponentTyped<{ show?: boolean }> {}
export class Image extends SvelteComponentTyped<
	{
		src: string;
		alt: string;
		lazy?: boolean;
		contain?: boolean;
		overlay?: boolean;
		absolute?: boolean;
		ratio?: number;
	},
	{ click: MouseEvent; dblclick: MouseEvent }
> {}
export class Link extends SvelteComponentTyped<{
	href?: string;
	label?: string;
	download?: boolean;
	newTab?: boolean;
	inherit?: boolean;
	invert?: boolean;
}> {}
export class Modal extends SvelteComponentTyped<{ show?: boolean }> {}
export class Observer extends SvelteComponentTyped<
	{ once?: boolean; top?: number; right?: number; bottom?: number; left?: number },
	{},
	{ default: { sighted: boolean } }
> {}
export class Overlay extends SvelteComponentTyped<{ show?: boolean }> {}

// functional
export class Pagination extends SvelteComponentTyped<
	{ store: Writable<any[]>; items: any[]; bound?: number; increment?: number; tween?: boolean },
	{},
	{ default: { limit: number; page: number; moveTo: (index: number) => void } }
> {}
export class SearchBar extends SvelteComponentTyped<{
	query: string;
	filters?: Record<string, string | string[]>;
	unique?: Record<string, string[] | Record<string, string>>;
}> {}
export class ThemeSwitcher extends SvelteComponentTyped<
	{ themes?: string[] },
	{},
	{ default: { current: string } }
> {}

// styled
export class ButtonLink extends SvelteComponentTyped<{
	href?: string;
	disabled?: boolean;
	label?: string;
	download?: boolean;
	newTab?: boolean;
	invert?: boolean;
}> {}
export class GradientBorder extends SvelteComponentTyped {}
export class ProgressBar extends SvelteComponentTyped {}
export class ScrollTop extends SvelteComponentTyped {}
export class Video extends SvelteComponentTyped<
	{
		src: string | string[];
		autoplay?: boolean;
		controls?: boolean;
		loop?: boolean;
		width?: number | string;
		height?: number | string;
		/* Binding Values */
		buffered?: TimeRanges;
		currentTime?: number;
		duration?: number;
		muted?: boolean;
	},
	{
		contact: { detail: { self: HTMLVideoElement; event: MouseEvent | TouchEvent } };
		leave: { detail: { self: HTMLVideoElement; event: MouseEvent | TouchEvent } };
	}
> {}
export class WeavedImage extends SvelteComponentTyped<{ src: string; alt: string }> {}
