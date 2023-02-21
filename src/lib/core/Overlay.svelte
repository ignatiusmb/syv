<script>
	import { fade } from 'svelte/transition';
	import { TIME } from '../options';

	export let show = false;
	export { className as class };
	let className = '';
</script>

{#if show}
	<div class="syv-core-overlay {className}" transition:fade={{ duration: TIME.FADE }}>
		<slot />
	</div>
{/if}

<style>
	div {
		z-index: 2;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		display: grid;
		justify-items: center;
		align-content: space-between;
		padding: 1em 0.5em;
		border-radius: inherit;
		background-color: rgba(0, 0, 0, 0.7);
		color: #ffffff;
		text-align: center;
	}
</style>
