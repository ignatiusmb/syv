<script lang="ts">
	import { Filter, Search } from '../icons/feather';
	import Feather from '../icons/Feather.svelte';

	import type { AnyLazyComponent } from '../types';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { TIME } from '../options';
	import { noop } from '../utils';

	interface IterableValues {
		[key: string]: string | Array<string | number> | Record<string, string>;
	}
	interface WildcardHandler {
		(event: (MouseEvent | FocusEvent) & { currentTarget: EventTarget & HTMLElement }): void;
	}

	export let query = '';
	export let placeholder = 'Type your queries here (Press "/" to focus)';
	export let items: any[] = [];
	/**
	 * - `string` to reference an image from static assets
	 * - `boolean` (`true`) to use built-in feather icon
	 * - callback to dynamically import and use an icon component
	 */
	export let icon: string | boolean | AnyLazyComponent = false;
	/** icon scale, base 16 */
	export let scale: string | number = '1.5';
	export let filters: boolean | IterableValues = false;
	export let unique: boolean | IterableValues = false;
	export { className as class };
	let className = '';

	const dispatch = createEventDispatcher();

	const show = { autocomplete: false, filter: false };
	let searchbox: HTMLInputElement;

	const handle = {
		select(item: any): WildcardHandler {
			return () => {
				dispatch('select', item);
				searchbox.blur();
			};
		},
		toggle(property: keyof typeof show, value: boolean): WildcardHandler {
			return () => {
				show[property] = value;
			};
		},
	};
</script>

<svelte:window
	on:keydown={(event) => {
		if (document.activeElement === searchbox) {
			if (event.key === 'Escape') searchbox.blur();
		} else if (event.key === '/') {
			event.preventDefault(), searchbox.focus();
		}
	}}
/>

<div class="syv-core-search-bar {className}">
	<div class:icon class:filters class="sb">
		<label>
			{#if icon}
				<span>
					{#if typeof icon === 'string'}
						<img src={icon} alt="icon" />
					{:else}
						<Feather {scale} icon={Search} />
					{/if}
				</span>
			{/if}

			<input
				type="text"
				{placeholder}
				bind:this={searchbox}
				bind:value={query}
				on:blur={handle.toggle('autocomplete', false)}
				on:focus={handle.toggle('autocomplete', true)}
			/>

			{#if show.autocomplete && items.length}
				<div class="autocomplete" on:pointerdown|preventDefault={noop}>
					{#each items as item}
						<slot name="autocomplete" {item} utils={{ select: handle.select(item) }}>
							<span on:pointerup={handle.select(item)}>
								{typeof item !== 'string' ? JSON.stringify(item) : item}
							</span>
						</slot>
					{/each}
				</div>
			{/if}
		</label>

		{#if filters}
			<button on:click={handle.toggle('filter', !show.filter)}>
				<Feather {scale} icon={Filter} />
			</button>
		{/if}
	</div>

	{#if filters && show.filter}
		<aside transition:slide={{ duration: TIME.SLIDE }}>
			{#if typeof filters === 'object' && typeof unique === 'object'}
				{#each Object.entries(unique) as [key, iterable]}
					<section>
						<h3>{key.replace(/_/g, ' ')}</h3>
						{#if Array.isArray(iterable)}
							{#each iterable as value}
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
							{#each Object.entries(iterable).sort(([x], [y]) => x.localeCompare(y)) as [val, desc]}
								{@const value = Number.isNaN(Number(val)) ? val : Number(val)}

								<label>
									{#if typeof filters[key] === 'string'}
										<input type="radio" bind:group={filters[key]} {value} />
									{:else}
										<input type="checkbox" bind:group={filters[key]} {value} />
									{/if}
									<span>{desc}</span>
								</label>
							{/each}
						{/if}
					</section>
				{/each}
			{/if}

			<slot />
		</aside>
	{/if}
</div>

<style>
	.syv-core-search-bar {
		display: grid;
		gap: 0.5em;
	}
	/* SearchBar */
	.sb {
		/* position: relative; */
		display: grid;
		gap: 0.5em;
		grid-template-columns: 1fr;
		border-radius: inherit;
	}
	.sb.filters {
		grid-template-columns: 1fr auto;
	}
	.sb.icon label > input {
		padding-left: 2.7em;
	}
	.sb.icon label > span:first-child {
		pointer-events: none;
		max-width: 1.5em;
		max-height: 1.5em;
		position: absolute;
		top: 50%;
		left: 0.6em;
		transform: translate(0, -50%);
		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
	}
	.sb.icon label > span:first-child > :global(*) {
		width: 100%;
		height: 100%;
	}

	.sb label,
	.sb input,
	.sb label + button {
		border-radius: inherit;
		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
		background-color: var(--bg-overlay, #2d2f34);
	}
	.sb label {
		position: relative;
	}

	.sb input {
		width: 100%;
		height: 100%;
	}
	.sb label + button {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		padding: 0.7em;
		border-radius: inherit;
	}
	/* Autocomplete */
	.autocomplete {
		z-index: 9;
		width: 100%;
		position: absolute;

		display: grid;
		padding: 0.5em 0;
		border: 1px solid var(--fg-surface, rgba(255, 255, 255, 0.65));

		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
		background-color: var(--bg-overlay, #2d2f34);
	}
	.autocomplete > :global(*) {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		padding: 0.4em 0.8em;
	}
	.autocomplete > :global(:hover) {
		cursor: pointer;
		color: #ffffff;
		background: #2e69e2;
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
		background-color: var(--bg-base, #1f2023);
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
