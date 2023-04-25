<script lang="ts">
	import type { SyvStyles } from '../types';
	import Feather from '../icons/Feather.svelte';
	import { writable } from 'svelte/store';
	import { weave } from '../utils';

	export let store = writable<any[]>([]);
	export let items: any[] = [];
	export let bound = 3;
	export let increment = bound;
	export let tween = false;
	export let styles: SyvStyles<'disabled-opacity' | 'text-color'> = {};
	export { className as class };
	let className = '';

	let page = 0;

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

	$: total = items.length;
	$: ceil = Math.ceil((total - bound) / increment);
	$: limit = ceil < 0 ? 0 : ceil;
	$: page = page > limit ? limit : page;

	$: count = page * increment;
	$: curr = total ? count + 1 : 0;
	$: comp = curr - 1 + bound;
	$: next = comp <= total ? comp : total;

	$: $store = items.slice(count, count + bound);
</script>

<section style={weave(styles)} class="syv-core-pagination {className}">
	<slot name="left">
		<div class="navigator">
			<button disabled={page === 0} on:click={click(0)}>
				<Feather icon={import('../icons/feather/chevrons-left')} />
			</button>
			<button disabled={page === 0} on:click={click(page - 1)}>
				<Feather icon={import('../icons/feather/chevron-left')} />
			</button>
		</div>
	</slot>

	<div class="slotted">
		<slot {limit} {page} {jump}>
			<div>{curr} - {next} / {total}</div>
		</slot>
	</div>

	<slot name="right">
		<div class="navigator">
			<button disabled={page === limit} on:click={click(page + 1)}>
				<Feather icon={import('../icons/feather/chevron-right')} />
			</button>
			<button disabled={page === limit} on:click={click(limit)}>
				<Feather icon={import('../icons/feather/chevrons-right')} />
			</button>
		</div>
	</slot>
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
