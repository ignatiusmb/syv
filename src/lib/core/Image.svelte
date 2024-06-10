<script lang="ts">
	import Observe from './Observe.svelte';
	import Overlay from './Overlay.svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		/** image source */
		src?: string;
		/** image alt text */
		alt?: string;
		/** image ratio with y/x axis as floating number */
		ratio?: number;
		/** lazily load image using intersection observer */
		lazy?: boolean;
		/** set object-fit to contain */
		contain?: boolean;
		/** enable overlay with default slot */
		overlay?: boolean;
		/** position wrapper div as absolute */
		absolute?: boolean;
		/** fade in options */
		transition?: import('svelte/transition').FadeParams;
		/** class name */
		class?: string;
		children: import('svelte').Snippet;
	}

	const {
		src = '',
		alt = '',
		ratio = 9 / 16,
		lazy = false,
		contain = false,
		overlay = false,
		absolute = false,
		transition = {},
		class: className,
		children,
	}: Props = $props();

	let show = $state(false);
</script>

{#snippet image()}
	<img {src} {alt} in:fade={transition} class:contain />
	{#if overlay}
		<Overlay {show}>
			{@render children()}
		</Overlay>
	{/if}
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	style:padding-top="{ratio * 100}%"
	class:absolute
	class="syv-core-image {className}"
	onmouseenter={() => (show = true)}
	onmouseleave={() => (show = false)}
>
	{#if lazy}
		<Observe once={true}>
			{#snippet children(sighted)}
				{#if sighted}{@render image()}{/if}
			{/snippet}
		</Observe>
	{:else}
		{@render image()}
	{/if}
</div>

<style>
	div {
		position: relative;
		border-radius: inherit;
	}
	div.absolute {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: inherit;
		text-align: center;
	}
	img.contain {
		object-fit: contain;
	}
</style>
