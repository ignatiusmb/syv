import { SvelteComponentTyped } from 'svelte';
import { Writable } from 'svelte/store';
// essentials
export class Dialog extends SvelteComponentTyped<{ show?: boolean }> {}
export class Image extends SvelteComponentTyped<
	{ src: string; alt: string; ratio?: number } & Partial<
		Record<'lazy' | 'contain' | 'overlay' | 'absolute', boolean>
	>,
	Record<'click' | 'dblclick', MouseEvent>
> {}
export class Link extends SvelteComponentTyped<
	Partial<Record<'href' | 'label', string>> &
		Partial<Record<'download' | 'newTab' | 'inherit' | 'invert' | 'noscroll' | 'refer', boolean>>,
	{},
	{ default: Record<'external', boolean> }
> {}
export class Modal extends SvelteComponentTyped<{ show?: boolean }> {}
export class Observer extends SvelteComponentTyped<
	Partial<Record<'once', boolean>> & Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>,
	{},
	{ default: Record<'sighted', boolean> }
> {}
export class Overlay extends SvelteComponentTyped<{ show?: boolean }> {}

// functional
export class Pagination extends SvelteComponentTyped<
	{ store: Writable<any[]>; items: any[]; tween?: boolean } & Partial<
		Record<'bound' | 'increment', number>
	>,
	{},
	{ default: { limit: number; page: number; moveTo: (index: number) => void } }
> {}
export class SearchBar extends SvelteComponentTyped<{
	query: string;
	filters?: Record<string, string | string[]>;
	unique?: Record<string, string[] | Record<string, string>>;
}> {}
export class ThemeSwitcher extends SvelteComponentTyped<
	Partial<Record<'themes', Array<string>>>,
	{},
	{ default: Record<'current', string> }
> {}

// styled
export class ButtonLink extends SvelteComponentTyped<
	Partial<Record<'href' | 'label', string>> &
		Partial<Record<'disable' | 'download' | 'newTab' | 'invert', boolean>>
> {}
export class GradientBorder extends SvelteComponentTyped {}
export class ProgressBar extends SvelteComponentTyped {}
export class ScrollTop extends SvelteComponentTyped {}
export class Video extends SvelteComponentTyped<
	Record<'src', string | Array<string>> &
		Partial<Record<'width' | 'height', number | string>> &
		Partial<Record<'autoplay' | 'controls' | 'loop', boolean>> & {
			/* Binding Values */
			buffered?: TimeRanges;
			currentTime?: number;
			duration?: number;
			muted?: boolean;
		},
	Record<
		'contact' | 'leave',
		{ detail: { self: HTMLVideoElement; event: MouseEvent | TouchEvent } }
	>
> {}
export class WeavedImage extends SvelteComponentTyped<Record<'src' | 'alt', string>> {}
