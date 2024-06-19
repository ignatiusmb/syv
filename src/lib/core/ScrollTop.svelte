<script lang="ts">
	import type { SyvStyles } from '../types';
	import { ChevronsUp } from '../icons/feather';
	import Feather from '../icons/Feather.svelte';
	import { weave } from '../utils';

	interface Props {
		/** show button based on document scroll percentage */
		reveal?: number;
		behavior?: ScrollBehavior;
		styles?: SyvStyles<
			'background' | 'show-x' | 'show-y' | 'text-color' | 'transition-duration' | 'z-index'
		>;
	}

	const { reveal = 0, behavior = 'smooth', styles = {} }: Props = $props();

	let scrollY = $state(0);
	let progress = $state(0);

	$effect(() => {
		const max = document.body.scrollHeight - window.innerHeight;
		progress = Math.min(Math.max((scrollY / max) * 100, 0), 100);
	});
</script>

<svelte:window bind:scrollY />
<button
	type="button"
	aria-label="Scroll to Top"
	style={weave(styles)}
	style:--progress={progress}
	class:show={progress >= reveal}
	onpointerdown={() => window.scrollTo({ top: 0, left: 0, behavior })}
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
		transform: translate(-50%, 100%);
		transition: transform var(--transition-duration, 300ms);

		/* radial progress */
		background: radial-gradient(closest-side, var(--background, #0e0e0e) 85%, transparent 86% 100%),
			conic-gradient(var(--color, #990000) calc(var(--progress) * 1%), var(--background, #0e0e0e) 0);

		&.show {
			transform: translate3d(var(--show-x, -50%), var(--show-y, -50%), 0);
		}
	}
</style>
