<script>
	export let query = '';
	export let filters = null;
	export let unique = null;
	import { tryNumber } from 'mauss/utils';
	import { slide } from 'svelte/transition';
	import { Filter } from '../icons/feather';
	import { duration } from '../options';
	let searchbox, show;
</script>

<svelte:window
	on:keydown={(event) => {
		if (document.activeElement === searchbox) return;
		if (event.key === '/') event.preventDefault(), searchbox.focus();
	}} />

<div class="syv-core-search-bar">
	<header class:filters>
		<input
			type="text"
			bind:this={searchbox}
			bind:value={query}
			placeholder="Type your queries here (Press {'"/"'} to focus)" />
		{#if filters}
			<span on:click={() => (show = !show)}>
				<Filter />
			</span>
		{/if}
	</header>

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
	header {
		display: grid;
		gap: 0.5em;
		grid-template-columns: 1fr;
	}
	header.filters {
		grid-template-columns: 1fr auto;
	}
	header input,
	header span {
		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
		background-color: var(--bg-overlay, #2d2f34);
	}
	header span {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		padding: 0.7em;
		border-radius: 0.3em;
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
