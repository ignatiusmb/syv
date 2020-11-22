<script>
	import { writable } from 'svelte/store';
	export let store = writable(0);
	export let total = 0;
	export let bound = 1;
	export let increment = bound;
	export let tween = false;
	import { Feather } from '../icons';
	function update(index) {
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
	$: ceil = Math.ceil((total - bound) / increment);
	$: limit = ceil < 0 ? 0 : ceil;
	$: $store = $store > limit ? limit : $store;

	$: curr = total ? $store * increment + 1 : 0;
	$: comp = curr - 1 + bound;
	$: next = comp <= total ? comp : total;
</script>

<section class="lmns lmns-pagination">
	<span class:disabled={$store === 0} on:click={() => update(0)}>
		<Feather.ChevronsLeft />
	</span>
	<span class:disabled={$store === 0} on:click={() => update($store - 1)}>
		<Feather.ChevronLeft />
	</span>

	<slot {curr} {next} {limit}>
		<div>{curr} - {next} / {total}</div>
	</slot>

	<span class:disabled={$store === limit} on:click={() => update($store + 1)}>
		<Feather.ChevronRight />
	</span>
	<span class:disabled={$store === limit} on:click={() => update(limit)}>
		<Feather.ChevronsRight />
	</span>
</section>

<style>
	section {
		max-width: 32em;
		width: 100%;
		display: grid;
		gap: 0.5em;
		grid-template-columns: 2em 2em 1fr 2em 2em;
		align-items: center;
		margin: 0 auto;
		text-align: center;
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
