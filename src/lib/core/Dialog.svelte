<script>
	export let show = false;
	export { className as class };
	let className = '';

	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { duration } from '../options';
	const dispatch = createEventDispatcher();

	const close = () => dispatch('close');
</script>

{#if show}
	<div class="syv-core-dialog-backdrop" on:click|self={close}>
		<section class="syv-core-dialog {className}" transition:fly={{ duration }}>
			<slot {close} />
		</section>
	</div>
{/if}

<style>
	div {
		z-index: 6;
		width: 100%;
		height: 100%;

		position: fixed;
		top: 0;
		left: 0;

		display: grid;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.8);
	}
	section {
		padding: 2em;
		border-radius: var(--b-radius, 0.5em);
		background: var(--bg-overlay, #ffffff);
	}
</style>
