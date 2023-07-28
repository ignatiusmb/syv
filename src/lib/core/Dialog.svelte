<script lang="ts">
	import type { SyvStyles } from '../types';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';
	import { FOCUSABLE, INPUT_FIELDS, TIME } from '../options';
	import { weave } from '../utils';

	/** change UI mode to `Modal` */
	export let required = false;
	export let styles: SyvStyles<
		| 'backdrop-color'
		| 'backdrop-filter'
		| 'background'
		| 'border-radius'
		| 'max-width'
		| 'padding'
		| 'z-index'
	> = {};
	export { className as class };
	let className = '';

	const elements = FOCUSABLE.join(', ');
	const dispatch = createEventDispatcher<{
		'syv:close': 'keydown' | 'pointerdown';
	}>();
	async function forward<T extends Event>(event: T) {
		const type = event.type as Parameters<typeof dispatch>[1];
		if (!dispatch('syv:close', type, { cancelable: true })) return;
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

	let show = true;
	let nodes: HTMLElement[];
	let dialog: undefined | HTMLElement;
	onMount(() => {
		// accounting 128px top and 16px bottom padding
		const height = window.innerHeight - (128 + 16);
		const observer = new ResizeObserver(([observed]) => {
			const target = observed.target as HTMLElement;
			target.style.removeProperty('overflow');
			if (target.clientHeight < height) return;
			target.style.setProperty('overflow', 'auto');
		});

		if (dialog) {
			observer.observe(dialog);
			dialog.style.setProperty('max-height', `${height}px`);
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
	on:keydown={(event) /** focus trapping */ => {
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
	<div style={weave(styles)} on:pointerdown|self={(event) => !required && forward(event)}>
		<main
			role="dialog"
			aria-modal="true"
			class="syv-core-dialog {className}"
			in:fly={{ duration: TIME.FLY, y: 64 }}
			out:fly={{ duration: TIME.FLY, y: -64 }}
			bind:this={dialog}
		>
			<slot {forward} {nodes} />
		</main>
	</div>
{/if}

<style>
	div /** backdrop */ {
		z-index: var(--z-index, 9);
		position: fixed;
		inset: 0;
		display: grid;
		justify-items: center;
		align-items: flex-start;
		grid-template-columns: 1fr var(--max-width, min(80ch, 100%)) 1fr;
		background: var(--backdrop-color, rgba(0, 0, 0, 0.4));
		backdrop-filter: var(--backdrop-filter, blur(0.1rem));
	}
	main {
		width: 100%;
		grid-column: 2;
		padding: var(--padding, 2rem);
		margin-top: 8rem;
		border-radius: var(--border-radius, 0.5rem);
		background: var(--background, #ffffff);
	}
</style>
