<script>
	import Observe from './Observe.svelte';
	import Overlay from './Overlay.svelte';
	import { fade } from 'svelte/transition';

	export let src = '';
	export let alt = '';
	/** image ratio with y/x axis as floating number */
	export let ratio = 9 / 16;
	/** lazily load image using intersection observer */
	export let lazy = false;
	/** set object-fit to contain */
	export let contain = false;
	/** enable overlay with default slot */
	export let overlay = false;
	/** position wrapper div as absolute */
	export let absolute = false;
	/** @type {import('svelte/transition').FadeParams} fade in options */
	export let transition = {};
	export { className as class };
	let className = '';

	let show = false;
</script>

<div
	style:padding-top="{ratio * 100}%"
	class:absolute
	class="syv-core-image {className}"
	on:mouseenter={() => (show = true)}
	on:mouseleave={() => (show = false)}
>
	{#if lazy}
		<Observe once let:sighted>
			{#if sighted}
				<img {src} {alt} in:fade={transition} class:contain />
				{#if overlay}
					<Overlay {show}>
						<slot />
					</Overlay>
				{/if}
			{/if}
		</Observe>
	{:else}
		<img {src} {alt} in:fade={transition} class:contain />
		{#if overlay}
			<Overlay {show}>
				<slot />
			</Overlay>
		{/if}
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
