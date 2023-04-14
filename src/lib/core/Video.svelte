<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let src: string | string[] = '';
	// Passed Values
	export let autoplay = false;
	export let controls = false;
	export let loop = false;
	export let width: number | null = null;
	export let height: number | null = null;
	// Binding Values
	export let buffered = undefined;
	export let currentTime = 0.0;
	export let duration = 0.0;
	export let muted = false;
	export { className as class };
	let className = '';

	let video: HTMLVideoElement; // Bind Video Element

	type Dispatched = 'contact' | 'leave';
	const dispatch = createEventDispatcher();
	const handler = (k: Dispatched) => (event: MouseEvent | TouchEvent) => {
		dispatch(k, { self: video, event });
	};
</script>

<video
	{width}
	{height}
	{autoplay}
	{controls}
	{loop}
	class="syv-core-video {className}"
	bind:this={video}
	bind:buffered
	bind:currentTime
	bind:duration
	bind:muted
	on:mouseenter={handler('contact')}
	on:mouseleave={handler('leave')}
	on:touchstart={handler('contact')}
	on:touchend={handler('leave')}
	on:touchcancel={handler('leave')}
>
	{#if typeof src === 'string'}
		<source {src} type="video/{src.slice(src.lastIndexOf('.') + 1)}" />
	{:else if src.length}
		{#each src as vid}
			<source src={vid} type="video/{vid.slice(vid.lastIndexOf('.') + 1)}" />
		{/each}
	{/if}
	<track kind="captions" />
</video>

<style>
	video {
		width: 100%;
		border-radius: inherit;
	}
</style>
