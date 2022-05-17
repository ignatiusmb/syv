<script>
	export { className as class };
	let className = '';

	/** @type {number} */
	let y,
		mounted = typeof window !== 'undefined',
		/** @type {undefined | number} */
		innerHeight = mounted ? document.body.scrollHeight : undefined;
	import { onMount } from 'svelte';
	onMount(() => (mounted = true));
	$: scrolled = mounted ? document.body.scrollHeight : y;
	$: progress = (y / (scrolled - (innerHeight || 0))) * 100;
</script>

<svelte:window bind:scrollY={y} bind:innerHeight />
<div class="syv-core-progress-bar {className}" style="transform:translateX({progress}%)" />

<style>
	div {
		z-index: 3;
		position: fixed;
		top: 0;
		left: -100%;
		width: 100%;
		height: 0.25em;
		background-color: #990000;
	}
</style>
