<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { FOCUSABLE, TIME } from '../options';

	/** change UI mode to `Modal` */
	export let required = false;
	export let show = true;
	export { className as class };
	let className = '';

	const close = handler();
	function handler<T extends Event>(fn: (event: T) => void = () => {}) {
		return (event: T) => {
			show = !!void (fn(event), observer?.disconnect());
			setTimeout(() => {
				document.body.style.removeProperty('padding-right');
				document.body.style.removeProperty('overflow');
			}, TIME.FLY);
		};
	}

	let dialog: undefined | HTMLElement;
	let observer: undefined | ResizeObserver;
	onMount(() => {
		// accounting 128px top and 16px bottom padding
		const height = window.innerHeight - (128 + 16);
		observer = new ResizeObserver(([observed]) => {
			const target = observed.target as HTMLElement;
			target.style.removeProperty('overflow');
			if (target.clientHeight < height) return;
			target.style.setProperty('overflow', 'auto');
		});

		if (dialog) {
			observer.observe(dialog);
			dialog.style.setProperty('max-height', `${height}px`);
		}

		const bar = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.setProperty('padding-right', `${bar}px`);
		document.body.style.setProperty('overflow', 'hidden');

		return () => observer?.disconnect();
	});

	$: nodes = Array.from(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE) || []).filter(
		(i) => i.offsetParent != null && i.offsetParent !== document.body
	);
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') return close(event);
		if (nodes && event.key === 'Tab') {
			if (nodes.length === 0) return event.preventDefault();
			if (dialog?.contains(document.activeElement)) return nodes[0].focus();

			const index = nodes.findIndex((i) => i === document.activeElement);
			const back = (index === 0 ? nodes.length : index) - 1;
			const next = index === nodes.length - 1 ? 0 : index + 1;
			nodes[event.shiftKey ? back : next].focus();
		}
	}}
/>

{#if show}
	<div on:pointerdown|self={(event) => !required && close(event)}>
		<main
			role="dialog"
			aria-modal="true"
			class="syv-core-dialog {className}"
			in:fly={{ duration: TIME.FLY, y: 64 }}
			out:fly={{ duration: TIME.FLY, y: -64 }}
			bind:this={dialog}
		>
			<slot close={handler} />
		</main>
	</div>
{/if}

<style>
	div /** backdrop */ {
		inset: 0;
		position: fixed;
		display: grid;
		align-items: flex-start;
		grid-template-columns: 1fr min(80ch, 100%) 1fr;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(0.1rem);
	}
	main {
		grid-column: 2;
		padding: 2rem;
		margin-top: 8rem;
		border-radius: var(--b-radius, 0.5rem);
		background: var(--bg-overlay, #ffffff);
	}
</style>
