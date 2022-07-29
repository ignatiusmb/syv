<script>
	export let z = 3;
	/** height in px */
	export let height = 4;
	export { className as class };
	let className = '';

	import { mounted } from '../store';

	let scrollY = $mounted ? document.body.scrollTop : 0;
	let innerHeight = $mounted ? document.body.scrollHeight : 1;

	$: scrolled = $mounted ? document.body.scrollHeight : scrollY;
	$: progress = (scrollY / (scrolled - innerHeight)) * 100;
</script>

<svelte:window bind:scrollY bind:innerHeight />

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
