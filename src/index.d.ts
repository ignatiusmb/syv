import { SvelteComponentTyped } from 'svelte';
import type { Writable } from 'svelte/store';
// essentials
export { default as Dialog } from './core/Dialog.svelte';
export { default as Image } from './core/Image.svelte';
export { default as Link } from './core/Link.svelte';
export { default as Modal } from './core/Modal.svelte';
export { default as Observe } from './core/Observe.svelte';
export { default as Overlay } from './core/Overlay.svelte';

// functional
export class Pagination extends SvelteComponentTyped<
	{ store: Writable<[]>; items: any[]; bound?: number; increment?: number; tween?: boolean },
	{},
	{ default: { limit: number; page: number } }
> {}
export { default as SearchBar } from './core/SearchBar.svelte';
export { default as ThemeSwitcher } from './core/ThemeSwitcher.svelte';

// styled
export { default as ButtonLink } from './core/ButtonLink.svelte';
export { default as GradientBorder } from './core/GradientBorder.svelte';
export { default as ProgressBar } from './core/ProgressBar.svelte';
export { default as ScrollTop } from './core/ScrollTop.svelte';
export { default as WeavedImage } from './core/WeavedImage.svelte';
