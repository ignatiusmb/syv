<script>
	/** @type {string | string[]} */
	export let src = '';
	/* Passed Values */
	export let autoplay = false;
	export let controls = false;
	export let loop = false;
	// export let poster = '';
	/** @type {null | number} */
	export let width = null;
	/** @type {null | number} */
	export let height = null;
	/* Binding Values */
	export let buffered = undefined;
	export let currentTime = 0.0;
	export let duration = 0.0;
	export let muted = false;
	export { className as class };
	let className = '';
	/** @type {HTMLVideoElement} */
	let video; // Bind Video Element

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/**
	 * @typedef {'contact' | 'leave'} DispatchedKind
	 * @typedef {MouseEvent | TouchEvent} PossibleEvents
	 */

	/** @type {(k: DispatchedKind) => (ev: PossibleEvents) => void} */
	const handler = (k) => (event) => dispatch(k, { self: video, event });
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
