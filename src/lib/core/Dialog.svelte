<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SyvStyles } from '../types';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { FOCUSABLE, INPUT_FIELDS, TIME } from '../options';
	import { weave } from '../utils';

	interface Props {
		/** change UI mode to `Modal` */
		required?: boolean;
		styles?: SyvStyles<
			| 'align-self'
			| 'backdrop-color'
			| 'backdrop-filter'
			| 'background'
			| 'border-radius'
			| 'margin-top'
			| 'max-width'
			| 'padding'
			| 'side-padding'
			| 'z-index'
		>;

		onclose?(type: 'keydown' | 'pointerdown'): boolean;
		children: Snippet<[{ forward: typeof forward; nodes: typeof nodes }]>;
	}

	const { required = false, styles = {}, onclose, children }: Props = $props();

	const elements = FOCUSABLE.join(', ');
	async function forward<T extends Event>(event: T) {
		if (onclose && !onclose(event.type as 'keydown' | 'pointerdown')) return;
		show = !!void setTimeout(() => {
			document.body.style.removeProperty('padding-right');
			document.body.style.removeProperty('overflow');
		}, TIME.FLY);
	}

	function sieve(elements: NodeListOf<Element>) {
		return Array.from(elements as NodeListOf<HTMLElement>).filter(
			(node) => node.offsetParent != null && node.offsetParent !== document.body,
		);
	}

	let show = $state(true);
	let nodes: HTMLElement[] = $state([]);
	let dialog: undefined | HTMLElement = $state();
	onMount(() => {
		const mb = dialog && window.getComputedStyle(dialog).marginBlock.split(' ');
		const gap = mb ? Math.max(+mb[0].slice(0, -2), +(mb[1]?.slice(0, -2) || 0)) : 0;
		const mxh = window.innerHeight - (gap * 2 + /* container y-padding */ 32);
		const observer = new ResizeObserver(([observed]) => {
			const target = observed.target as HTMLElement;
			target.style.removeProperty('overflow');
			if (target.clientHeight < mxh) return;
			target.style.setProperty('overflow', 'auto');
		});

		if (dialog) {
			observer.observe(dialog);
			dialog.style.setProperty('max-height', `${mxh}px`);
			const elements = INPUT_FIELDS.join(', ');
			const inputs = sieve(dialog.querySelectorAll(elements));
			if (inputs.length) inputs[0].focus();
		}

		// (scrollbar width) = (window width) - (<html> width)
		const bar = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.setProperty('padding-right', `${bar}px`);
		document.body.style.setProperty('overflow', 'hidden');

		return () => observer.disconnect();
	});
</script>

<svelte:window
	onkeydown={(event) /** focus trapping */ => {
		if (!show || !dialog) return; // closed but not destroyed
		if (event.key === 'Escape') return forward(event);
		nodes = sieve(dialog.querySelectorAll(elements));
		if (event.key === 'Tab' && nodes.length) {
			const index = nodes.findIndex((i) => i === document.activeElement);
			if (index === -1) return nodes[0].focus(), event.preventDefault();

			const back = (index === 0 ? nodes.length : index) - 1;
			const next = index === nodes.length - 1 ? 0 : index + 1;
			nodes[event.shiftKey ? back : next].focus(), event.preventDefault();
		}
	}}
/>

{#if show}
	<div
		style={weave(styles)}
		onpointerdown={(event) => event.currentTarget === event.target && !required && forward(event)}
	>
		<main
			bind:this={dialog}
			in:fly|global={{ duration: TIME.FLY, y: 64 }}
			out:fly={{ duration: TIME.FLY, y: -64 }}
			role="dialog"
			aria-modal="true"
			class="syv-core-dialog"
		>
			{@render children({ forward, nodes })}
		</main>
	</div>
{/if}

<style>
	div {
		z-index: var(--z-index, 9);
		position: fixed;
		inset: 0;
		display: grid;
		justify-items: center;
		align-items: flex-start;
		grid-template-columns: 1fr var(--max-width, min(80ch, 100%)) 1fr;
		padding: 1rem var(--side-padding, 1rem);
		background: var(--backdrop-color, rgba(0, 0, 0, 0.4));
		backdrop-filter: var(--backdrop-filter, blur(0.1rem));
	}
	main {
		width: 100%;
		grid-column: 2;
		align-self: var(--align-self, center);
		padding: var(--padding, 2rem);
		margin-top: var(--margin-top);
		border-radius: var(--border-radius, 0.5rem);
		background: var(--background, #ffffff);
	}
</style>
