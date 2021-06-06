<script>
	export let show = false;
	import { fade } from 'svelte/transition';
	import { duration } from '../options';
</script>

{#if show}
	<div class="lmns lmns-overlay" transition:fade={{ duration }}>
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
		color: #fff;
		text-align: center;
	}
</style>
