<script>
	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let store = writable(0);
	export let items = [];
	export let bound = 3;
	export let increment = bound;
	export let tween = false;

	import { Feather } from '../icons';

	function moveTo(index) {
		if (index < 0 || index > limit) return;
		if (tween && (index === 0 || index === limit)) {
			let timeout = null;
			const repeat = () => {
				$store = index === 0 ? $store - 1 : $store + 1;
				if ($store === 0 || $store === limit) clearTimeout(timeout);
				else timeout = setTimeout(repeat, 50);
			};
			timeout = setTimeout(repeat, 50);
		} else $store = index;
	}

	$: total = items.length;
	$: ceil = Math.ceil((total - bound) / increment);
	$: limit = ceil < 0 ? 0 : ceil;
	$: $store = $store > limit ? limit : $store;

	$: count = $store * increment;
	$: curr = total ? count + 1 : 0;
	$: comp = curr - 1 + bound;
	$: next = comp <= total ? comp : total;

	$: dispatch('update', items.slice(count, count + bound));
</script>

<section class="lmns lmns-pagination">
	<slot name="left">
		<div class="navigator">
			<span class:disabled={$store === 0} on:click={() => moveTo(0)}>
				<Feather.ChevronsLeft />
			</span>
			<span class:disabled={$store === 0} on:click={() => moveTo($store - 1)}>
				<Feather.ChevronLeft />
			</span>
		</div>
	</slot>

	<div class="slot-holder">
		<slot {limit} {moveTo}>
			<div>{curr} - {next} / {total}</div>
		</slot>
	</div>

	<slot name="right">
		<div class="navigator">
			<span class:disabled={$store === limit} on:click={() => moveTo($store + 1)}>
				<Feather.ChevronRight />
			</span>
			<span class:disabled={$store === limit} on:click={() => moveTo(limit)}>
				<Feather.ChevronsRight />
			</span>
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
	.slot-holder {
		display: grid;
		gap: 0.5em;
		grid-auto-flow: column;
	}
	span {
		cursor: pointer;
		display: inline-flex;
		justify-content: center;
	}
	span.disabled {
		cursor: not-allowed;
		opacity: 0.4;
	}
</style>
