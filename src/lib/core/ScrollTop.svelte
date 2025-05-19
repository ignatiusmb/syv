<script lang="ts">
	import type { SyvStyles } from '../types';
	import { weave } from '../utils';

	interface Props {
		/** show button based on document scroll percentage */
		reveal?: number;
		behavior?: ScrollBehavior;
		styles?: SyvStyles<
			'background' | 'size' | 'show-x' | 'show-y' | 'text-color' | 'transition-duration' | 'z-index'
		>;
	}

	const { reveal = 1, behavior = 'smooth', styles = {} }: Props = $props();

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
	<svg
		viewBox="0 0 256 256"
		fill="currentColor"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="16"
		transform="scale(0.8)"
	>
		<polyline points="48 192 128 112 208 192" fill="none" />
		<line x1="48" y1="72" x2="208" y2="72" fill="none" />
	</svg>
</button>

<style>
	button {
		cursor: pointer;
		width: var(--size, 3rem);
		height: var(--size, 3rem);

		position: fixed;
		z-index: var(--z-index, 1);
		bottom: 0;
		right: 0;

		display: inline-flex;
		align-items: center;
		justify-content: center;
		/* padding: 1.5rem; */
		border-radius: 50%;
		color: var(--color, #990000);
		transform: translate(-50%, 100%);
		transition: transform var(--transition-duration, 240ms);

		/* radial progress */
		background: radial-gradient(closest-side, var(--background, #0e0e0e) 84%, transparent 90% 100%),
			conic-gradient(var(--color, #990000) calc(var(--progress) * 1%), var(--background, #0e0e0e) 0);

		&.show {
			transform: translate3d(var(--show-x, -50%), var(--show-y, -50%), 0);
		}
	}
</style>
