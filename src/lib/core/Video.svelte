<script>
	let video; // Bind Video Element
	export let src = '';
	/* Passed Values */
	export let autoplay = false;
	export let controls = false;
	export let loop = false;
	// export let poster = '';
	export let width = null;
	export let height = null;
	/* Binding Values */
	export let buffered = undefined;
	export let currentTime = 0.0;
	export let duration = 0.0;
	export let muted = false;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<video
	{width}
	{height}
	{autoplay}
	{controls}
	{loop}
	bind:this={video}
	bind:buffered
	bind:currentTime
	bind:duration
	bind:muted
	on:mouseenter={(event) => dispatch('contact', { self: video, event })}
	on:mouseleave={(event) => dispatch('leave', { self: video, event })}
	on:touchstart={(event) => dispatch('contact', { self: video, event })}
	on:touchend={(event) => dispatch('leave', { self: video, event })}
	on:touchcancel={(event) => dispatch('leave', { self: video, event })}
	class="syv-core-video">
	{#if typeof src === 'string'}
		<source {src} type="video/{src.slice(src.lastIndexOf('.') + 1)}" />
	{:else if src instanceof Array}
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
