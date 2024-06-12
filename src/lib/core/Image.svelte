<script lang="ts">
	import { fade } from 'svelte/transition';

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
		children?: import('svelte').Snippet;
	}

	const {
		src = '',
		alt = '',
		ratio = 9 / 16,
		contain = false,
		transition = {},
		children,
	}: Props = $props();
</script>

<div style:padding-top="{ratio * 100}%" class="syv-core-image">
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
			border-radius: inherit;
			background: rgba(0, 0, 0, 0.5);
			transition: var(--t-duration, 300ms);

			&:hover {
				opacity: 1;
			}
		}
	}
</style>
