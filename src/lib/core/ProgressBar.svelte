<script lang="ts">
	import { mounted } from '../store';

	const {
		z = 3,
		height = '1rem',
		class: className = '',
	} = $props<{
		z?: number;
		/** height in css unit */
		height?: string;
		class?: string;
	}>();

	let scrollY = $state($mounted ? document.body.scrollTop : 0);
	let innerHeight = $state($mounted ? document.body.scrollHeight : 1);

	const scrolled = $derived($mounted ? document.body.scrollHeight : scrollY);
	const progress = $derived((scrollY / (scrolled - innerHeight)) * 100);
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
