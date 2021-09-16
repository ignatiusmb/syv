<script>
	let className = '';
	export { className as class };
	export let query = '';
	export let placeholder = 'Type your queries here (Press "/" to focus)';
	export let icon = false;
	export let filters = null;
	export let unique = null;

	import { tryNumber } from 'mauss/utils';
	import { slide } from 'svelte/transition';
	import { duration } from '../options';

	import LazyLoad from './LazyLoad.svelte';
	const icons = {
		search: () => import('../icons/feather/Search.svelte'),
		filter: () => import('../icons/feather/Filter.svelte'),
	};

	let searchbox, show;
</script>

<svelte:window
	on:keydown={(event) => {
		if (document.activeElement === searchbox) return;
		if (event.key === '/') event.preventDefault(), searchbox.focus();
	}}
/>

<div class="syv-core-search-bar {className}">
	<label class:icon class:filters class="sb">
		{#if icon}
			<slot name="search">
				<span>
					{#if typeof icon === 'string'}
						<img src={icon} alt="icon" />
					{:else}
						<LazyLoad
							when
							file={typeof icon === 'function' ? icon : icons.search}
							let:loaded={SearchIcon}
						>
							<SearchIcon />
						</LazyLoad>
					{/if}
				</span>
			</slot>
		{/if}

		<input type="text" bind:this={searchbox} bind:value={query} {placeholder} />

		{#if filters}
			<slot name="filter">
				<span on:click={() => (show = !show)}>
					<LazyLoad when file={icons.filter} let:loaded={FilterIcon}>
						<FilterIcon />
					</LazyLoad>
				</span>
			</slot>
		{/if}
	</label>

	{#if filters && unique && show}
		<aside transition:slide={{ duration }}>
			{#each Object.keys(unique) as key}
				<section>
					<h3>{key.replace(/_/g, ' ')}</h3>
					{#if Array.isArray(unique[key])}
						{#each unique[key] as value}
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label>
								{#if typeof filters[key] === 'string'}
									<input type="radio" bind:group={filters[key]} {value} />
								{:else}
									<input type="checkbox" bind:group={filters[key]} {value} />
								{/if}
								<span>{value}</span>
							</label>
						{/each}
					{:else}
						{#each Object.entries(unique[key]).sort((x, y) => y[0] - x[0]) as [val, desc]}
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label>
								{#if typeof filters[key] === 'string'}
									<input type="radio" bind:group={filters[key]} value={tryNumber(val)} />
								{:else}
									<input type="checkbox" bind:group={filters[key]} value={tryNumber(val)} />
								{/if}
								<span>{desc}</span>
							</label>
						{/each}
					{/if}
				</section>
			{/each}

			<slot />
		</aside>
	{/if}
</div>

<style>
	div {
		display: grid;
		gap: 0.5em;
	}
	/* SearchBar */
	.sb {
		position: relative;
		display: grid;
		gap: 0.5em;
		grid-template-columns: 1fr;
		border-radius: inherit;
	}
	.sb.filters {
		grid-template-columns: 1fr auto;
	}
	.sb.icon input {
		padding-left: 2.7em;
	}
	.sb.icon span:first-child {
		max-width: 1.5em;
		max-height: 1.5em;
		position: absolute;
		top: 50%;
		left: 0.6em;
		transform: translate(0, -50%);
		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
	}
	.sb.icon span:first-child > :global(*) {
		width: 100%;
		height: 100%;
	}
	.sb input,
	.sb input + span {
		border-radius: inherit;
		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
		background-color: var(--bg-overlay, #2d2f34);
	}
	.sb input + span {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		padding: 0.7em;
		border-radius: inherit;
	}
	/* FilterGrid */
	aside {
		width: 100%;
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
	}
	aside h3,
	aside label span,
	aside :global(h3),
	aside :global(label span) {
		text-transform: capitalize;
	}
	aside input,
	aside :global(input) {
		display: none;
	}
	aside section,
	aside :global(section) {
		overflow-y: auto;
		max-height: 20em;
		display: flex;
		flex-direction: column;
	}
	aside section h3,
	aside :global(section h3) {
		position: sticky;
		top: 0;
		padding: 0.5em 0.25em;
		border-bottom: 1px solid var(--fg-surface, rgba(255, 255, 255, 0.65));
		margin-bottom: 0.5em;
		background-color: var(--bg-base, #1f2023);
	}
	aside section label,
	aside > :global(section label) {
		cursor: pointer;
		padding: 0.5em 0.25em;
	}
	aside section label span,
	aside > :global(section label span) {
		color: var(--fg-overlay, rgba(255, 255, 255, 0.3));
	}
	aside section input:checked + span,
	aside > :global(section input:checked + span) {
		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
	}
	aside section input:checked + span::after,
	aside > :global(section input:checked + span::after) {
		content: '✔';
		margin-left: 0.5em;
	}
</style>
