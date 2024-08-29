<script lang="ts" generics="T extends { slug: string }">
	import { Search, Sliders } from '../icons/feather';
	import Feather from '../icons/Feather.svelte';

	interface Props {
		items: T[];
		value?: string;
		placeholder?: string;

		icons?: {
			search: import('svelte').ComponentProps<Feather>['icon'];
			filter: import('svelte').ComponentProps<Feather>['icon'];
		};

		sieve(utils: {
			item: T;
			query: string;
			normalize(s: string): string;
		}): true | import('mauss/typings').Falsy;
		filter?(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }): void;

		autocomplete?: import('svelte').Snippet<[{ index: T[]; update(v: string): void }]>;
		children?: import('svelte').Snippet<[{ query: string; index: T[] }]>;
	}

	let {
		items,

		value = '',
		placeholder = 'Type your queries here (Press "/" to focus)',
		icons = {
			search: Search,
			filter: Sliders,
		},

		sieve,
		filter,

		autocomplete,
		children,
	}: Props = $props();

	const show = $state({ autocomplete: false });
	let searchbox: undefined | HTMLInputElement = $state();

	const sifted = $derived.by(() => {
		const normalize = (s: string) => s.replace(/[(){}[\]<>"']/g, '').toLowerCase();
		return items.filter((item) => sieve({ item, query: value, normalize }));
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (document.activeElement === searchbox) {
			if (event.key === 'Escape') searchbox.blur();
		} else if (event.key === '/') {
			event.preventDefault(), searchbox?.focus();
		}
	}}
/>

<div class="syv-core-search-bar">
	<label>
		<Feather scale="1.5" icon={icons.search} />

		<input
			bind:this={searchbox}
			bind:value
			type="text"
			{placeholder}
			onblur={() => (show.autocomplete = false)}
			onfocus={() => (show.autocomplete = true)}
		/>
	</label>

	{#if filter}
		<button onclick={filter}>
			<Feather scale="1.5" icon={icons.filter} />
		</button>
	{/if}

	{#if show.autocomplete && value.length > 1 && autocomplete}
		<div class="autocomplete">
			{@render autocomplete({
				index: sifted,
				update(v) {
					value = v;
					searchbox?.blur();
				},
			})}
		</div>
	{/if}
</div>

{@render children?.({ query: value, index: sifted })}

<style>
	.syv-core-search-bar {
		position: relative;
		width: 100%;

		display: flex;
		gap: 0.5rem;
		align-items: center;
		border-radius: inherit;

		label,
		input {
			border-radius: inherit;
			color: var(--fg-surface, rgba(255, 255, 255, 0.65));
			background-color: var(--bg-overlay, #2d2f34);
		}
		label {
			position: relative;
			flex-grow: 1;

			& > :global(:first-child) {
				pointer-events: none;
				max-width: 1.5rem;
				max-height: 1.5rem;
				width: 100%;
				height: 100%;

				position: absolute;
				top: 50%;
				left: 0.6rem;
				transform: translate(0, -50%);
				color: var(--fg-surface, rgba(255, 255, 255, 0.65));
			}

			& > input {
				padding-left: 2.7rem;
			}
		}
		input {
			width: 100%;
			height: 100%;
		}

		button {
			height: 100%;
			display: flex;
			align-items: center;
			border-radius: inherit;
			color: var(--fg-surface, rgba(255, 255, 255, 0.65));

			&:hover,
			&:focus {
				background-color: var(--bg-overlay, #2d2f34);
			}
		}
	}

	.autocomplete {
		z-index: 9;
		overflow-y: auto;

		width: 100%;
		max-height: 16rem;
		position: absolute;
		top: 100%;

		display: grid;
		padding: 0.5rem 0;
		margin-top: 0.25rem;
		border: 1px solid var(--fg-surface, rgba(255, 255, 255, 0.65));
		border-radius: var(--b-radius);

		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
		background-color: var(--bg-overlay, #2d2f34);

		&:empty {
			display: none;
		}

		& > :global(*) {
			overflow: hidden;
			white-space: nowrap;
			text-align: left;
			text-overflow: ellipsis;

			padding: 0.4rem 0.8rem;
			color: inherit;

			&:hover {
				cursor: pointer;
				color: #ffffff;
				background: #2e69e2;
			}
		}
	}
</style>
