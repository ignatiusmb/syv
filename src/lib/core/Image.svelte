<script lang="ts">
	import type { SyvStyles } from '../types';
	import { fade } from 'svelte/transition';
	import { weave } from '../utils';

	interface Props {
		/** image source */
		src?: string;
		/** image alt text */
		alt?: string;
		/** image ratio with y/x axis as floating number */
		ratio?: number;
		/** set object-fit to contain */
		contain?: boolean;
		/** fade in options */
		transition?: import('svelte/transition').FadeParams;
		styles?: SyvStyles<'background' | 'padding' | 'transition-duration'>;
		children?: import('svelte').Snippet;
	}

	const {
		src = '',
		alt = '',
		ratio = 9 / 16,
		contain = false,
		styles = {},
		transition = {},
		children,
	}: Props = $props();
</script>

<div class="syv-core-image" style:padding-top="{ratio * 100}%" style={weave(styles)}>
	<img {src} {alt} loading="lazy" in:fade={transition} class:contain />
	{#if children}
		<div class="canvas">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	div {
		position: relative;
		border-radius: inherit;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			position: absolute;
			top: 0;
			left: 0;
			border-radius: inherit;
			text-align: center;

			&.contain {
				object-fit: contain;
			}
		}

		.canvas {
			opacity: 0;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			display: grid;
			align-items: center;
			justify-content: center;
			padding: var(--padding, 1rem);
			border-radius: inherit;
			text-align: center;
			background: var(--background, rgba(0, 0, 0, 0.5));
			transition: var(--transition-duration, 300ms);

			&:hover {
				opacity: 1;
			}
		}
	}
</style>
