<script lang="ts">
	import type { TooltipProps } from './tooltip';
	import { weave } from '../utils';

	let {
		html = '',
		x = 0,
		y = 0,
		state,
		styles = {},
		class: className,
		...props
	}: TooltipProps = $props();
</script>

<div
	role="tooltip"
	style:top="{y - 6}px"
	style:left="{x}px"
	style={weave(styles)}
	class:fade={state === 'fade'}
	class="tooltip {className}"
	{...props}
>
	{@html html}
</div>

<style>
	div {
		z-index: 10;
		max-width: 16rem;
		position: absolute;
		padding: var(--padding, 0.5rem 1rem);
		border-radius: var(--border-radius, 0.5rem);
		transform: translate(-50%, -100%);
		background: var(--background, #3f3f46);
		color: var(--text-color, #ffffff);
		font-size: var(--text-size, 0.875rem);
	}

	div::after {
		content: '';
		width: 0.5rem;
		height: 0.5rem;
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 50%) rotate(45deg);
		background: var(--background, #3f3f46);
	}

	.fade {
		opacity: 0;
		transition-delay: 1600ms;
		transition-duration: 240ms;
	}
</style>
