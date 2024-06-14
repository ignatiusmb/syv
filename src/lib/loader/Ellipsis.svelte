<script lang="ts">
	import type { SyvStyles } from '../types';
	import { weave } from '../utils';

	interface Props {
		styles?: SyvStyles<'background' | 'margin' | 'padding' | 'spacing'>;
	}

	let { styles = {} }: Props = $props();
</script>

<div style={weave(styles)} class="syv-loader-ellipsis">
	<span></span>
	<span></span>
	<span></span>
</div>

<style>
	div {
		display: grid;
		gap: var(--spacing, 0.5rem);
		grid-auto-flow: column;
		margin: var(--margin, 1rem auto);
		padding: var(--padding, 1rem);
	}
	span {
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		background: var(--background, #fc2f70);
		transform: translateY(-100%);
		animation: wave 800ms ease-in-out alternate infinite;
	}
	span:nth-of-type(1) {
		animation-delay: -400ms;
	}
	span:nth-of-type(2) {
		animation-delay: -200ms;
	}
	@keyframes wave {
		from {
			transform: translateY(-100%);
		}
		to {
			transform: translateY(100%);
		}
	}
</style>
