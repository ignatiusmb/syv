<script>
	let className = '';
	export { className as class };

	let y, innerHeight, mounted;
	import { onMount } from 'svelte';
	onMount(() => (mounted = true));
	$: progress = (y / ((mounted ? document.body.scrollHeight : y) - innerHeight)) * 100;
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
