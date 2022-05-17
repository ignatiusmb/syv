<script>
	export let z = 3;
	/** height in px */
	export let height = 4;
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
<div
	class="syv-core-progress-bar {className}"
	style="
		z-index: {z};
		height: {height / 4}rem;
		transform: translateX({progress}%);
	"
/>

<style>
	div {
		width: 100%;
		position: fixed;
		top: 0;
		left: -100%;
		background-color: #990000;
	}
</style>
