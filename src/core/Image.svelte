<script>
	export let src = '';
	export let alt = '';
	export let lazy = false;
	export let contain = false;
	export let overlay = false;
	export let absolute = false;
	export let ratio = 9 / 16;

	import { fade } from 'svelte/transition';
	import Observe from './Observe.svelte';
	import Overlay from './Overlay.svelte';
	let show = false;
</script>

<div
	style="padding-top: {ratio * 100}%"
	class="lmns lmns-image"
	class:absolute
	on:click
	on:dblclick
	on:mouseenter={() => (show = true)}
	on:mouseleave={() => (show = false)}>
	{#if lazy}
		<Observe once let:sighted>
			{#if sighted}
				<img {src} {alt} in:fade class:contain />
				{#if overlay}
					<Overlay {show}>
						<slot />
					</Overlay>
				{/if}
			{/if}
		</Observe>
	{:else}
		<img {src} {alt} in:fade class:contain />
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
