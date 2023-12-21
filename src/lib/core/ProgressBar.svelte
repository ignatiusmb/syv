<script>
	export let z = 3;
	/** height in css unit */
	export let height = '1rem';
	export { className as class };
	let className = '';

	const browser = typeof window !== 'undefined';
	let scrollY = browser ? document.body.scrollTop : 0;
	let innerHeight = browser ? document.body.scrollHeight : 1;

	$: scrolled = browser ? document.body.scrollHeight : scrollY;
	$: progress = (scrollY / (scrolled - innerHeight)) * 100;
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div
	class="syv-core-progress-bar {className}"
	style:height
	style:z-index={z}
	style:transform="translateX({progress}%)"
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
