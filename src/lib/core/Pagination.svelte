<script>
	let className = '';
	export { className as class };
	export let store = writable([]);
	export let items = [];
	export let bound = 3;
	export let increment = bound;
	export let tween = false;

	import { writable } from 'svelte/store';

	import ChevronsLeft from '../icons/feather/ChevronsLeft.svelte';
	import ChevronLeft from '../icons/feather/ChevronLeft.svelte';
	import ChevronRight from '../icons/feather/ChevronRight.svelte';
	import ChevronsRight from '../icons/feather/ChevronsRight.svelte';

	let page = 0;
	function moveTo(index) {
		if (index < 0 || index > limit) return;
		if (tween && (index === 0 || index === limit)) {
			let timeout;
			const repeat = () => {
				page = index === 0 ? page - 1 : page + 1;
				if (page === 0 || page === limit) clearTimeout(timeout);
				else timeout = setTimeout(repeat, 50);
			};
			timeout = setTimeout(repeat, 50);
		} else page = index;
	}

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

<section class="syv-core-pagination {className}">
	<slot name="left">
		<div class="navigator">
			<span class:disabled={page === 0} on:click={() => moveTo(0)}>
				<ChevronsLeft />
			</span>
			<span class:disabled={page === 0} on:click={() => moveTo(page - 1)}>
				<ChevronLeft />
			</span>
		</div>
	</slot>

	<div class="slot-holder">
		<slot {limit} {page} {moveTo}>
			<div>{curr} - {next} / {total}</div>
		</slot>
	</div>

	<slot name="right">
		<div class="navigator">
			<span class:disabled={page === limit} on:click={() => moveTo(page + 1)}>
				<ChevronRight />
			</span>
			<span class:disabled={page === limit} on:click={() => moveTo(limit)}>
				<ChevronsRight />
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
