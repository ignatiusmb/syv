<script lang="ts">
	import type { SyvStyles } from '../types';
	import * as feather from '../icons/feather';
	import Feather from '../icons/Feather.svelte';
	import { weave } from '../utils';

	interface Props {
		items: any[];
		bound?: number;
		increment?: number;
		tween?: boolean;
		styles?: SyvStyles<'text-color' | 'disabled:opacity'>;
		class?: string;

		left?: import('svelte').Snippet;
		right?: import('svelte').Snippet;
		children?: import('svelte').Snippet<
			[{ limit: number; page: number; jump: (index: number) => void }]
		>;
	}

	const {
		items = [],
		bound = 3,
		increment = bound,
		tween = false,
		styles = {},
		class: className = '',

		left,
		right,
		children,
	}: Props = $props();

	let page = $state(0);

	function jump(index: number) {
		if (index < 0 || index > limit) return;
		if (tween && (index === 0 || index === limit)) {
			let timeout: number;
			const repeat = () => {
				page = index === 0 ? page - 1 : page + 1;
				if (page === 0 || page === limit) clearTimeout(timeout);
				else timeout = setTimeout(repeat, 50);
			};
			timeout = setTimeout(repeat, 50);
		} else page = index;
	}

	const click = (i: number) => () => jump(i);

	const total = $derived(items.length);
	const ceil = $derived(Math.ceil((total - bound) / increment));
	const limit = $derived(ceil < 0 ? 0 : ceil);
	// const page = $derived(page > limit ? limit : page);

	const count = $derived(page * increment);
	const curr = $derived(total ? count + 1 : 0);
	const comp = $derived(curr - 1 + bound);
	const next = $derived(comp <= total ? comp : total);

	// $: $store = items.slice(count, count + bound);
</script>

{#snippet fallback(side)}
	{@const disabled = side === 'left' ? page === 0 : page === limit}

	<div class="navigator">
		<button {disabled} onclick={click(side === 'left' ? 0 : page + 1)}>
			<Feather icon={side === 'left' ? feather.ChevronsLeft : feather.ChevronRight} />
		</button>
		<button {disabled} onclick={click(side === 'left' ? page - 1 : limit)}>
			<Feather icon={side === 'left' ? feather.ChevronLeft : feather.ChevronsRight} />
		</button>
	</div>
{/snippet}

<section style={weave(styles)} class="syv-core-pagination {className}">
	{#if left}{@render left()}{:else}{@render fallback('left')}{/if}

	<div class="slotted">
		{#if children}
			{@render children({ limit, page, jump })}
		{:else}
			<div>{curr} - {next} / {total}</div>
		{/if}
	</div>

	{#if right}{@render right()}{:else}{@render fallback('right')}{/if}
</section>

<style>
	section {
		width: 100%;
		display: grid;
		gap: 1em;
		grid-template-columns: 5em 1fr 5em;
		align-items: center;
		margin: 0 auto;
		text-align: center;
	}
	.navigator {
		display: grid;
		gap: 0.5em;
		grid-template-columns: 1fr 1fr;
	}
	.slotted {
		display: grid;
		gap: 0.5em;
		grid-auto-flow: column;
	}
	button {
		color: var(--text-color, #ffffff);
		display: inline-flex;
		justify-content: center;
	}
	button:disabled {
		cursor: default;
		opacity: var(--disabled-opacity, 0.4);
	}
</style>
