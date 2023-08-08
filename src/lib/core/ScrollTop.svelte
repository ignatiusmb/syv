<script lang="ts">
	import type { SyvStyles } from '../types';
	import { ChevronsUp } from '../icons/feather';
	import Feather from '../icons/Feather.svelte';
	import { mounted } from '../store';
	import { weave } from '../utils';

	/** show button based on document scroll percentage */
	export let reveal = 0;
	export let behavior: ScrollBehavior = 'smooth';
	export let styles: SyvStyles<
		'background' | 'text-color' | 'transition-duration' | 'z-index' | 'hover-background'
	> = {};

	let y = 0;
</script>

<svelte:window bind:scrollY={y} />
<button
	type="button"
	style={weave(styles)}
	class:show={!($mounted && reveal > (y / document.body.scrollHeight) * 100)}
	on:click={() => window.scrollTo({ top: 0, left: 0, behavior })}
>
	<Feather icon={ChevronsUp} />
</button>

<style>
	button {
		cursor: pointer;
		position: fixed;
		z-index: var(--z-index, 1);
		bottom: 0;
		right: 0;
		width: 3rem;
		height: 3rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		color: var(--color, #990000);
		background: var(--background, rgba(0, 0, 0, 0.25));
		transform: translate(-50%, 100%);
		transition: transform var(--transition-duration, 300ms);
	}
	button.show {
		transform: translate(-50%, -150%);
	}
	button:hover {
		background: var(--hover-background, rgba(0, 0, 0, 0.5));
	}

	@media only screen and (min-width: 600px) {
		button.show {
			transform: translate(-50%, -50%);
		}
	}
</style>
