<script lang="ts" generics="T extends { slug: string }">
	import { Search } from '../icons/feather';
	import Feather from '../icons/Feather.svelte';

	interface Props {
		items: T[];
		transformer(item: T): Record<string, string>;

		value?: string;
		placeholder?: string;

		/**
		 * - `string` to reference an image from static assets
		 * - `boolean` (`true`) to use built-in feather icon
		 * - snippet to render your own icon
		 */
		icon?: string | boolean | import('svelte').Snippet;
		class?: string;

		children?: import('svelte').Snippet<[{ query: string; index: T[] }]>;
	}

	let {
		value = '',
		placeholder = 'Type your queries here (Press "/" to focus)',
		icon = false,
		class: className = '',

		items,
		transformer,

		children,
	}: Props = $props();

	const show = $state({ autocomplete: false });
	let searchbox: undefined | HTMLInputElement = $state();

	function normalize(s: string) {
		return s.replace(/[(){}[\]<>"']/g, '').toLowerCase();
	}

	const sifted = $derived.by(() => {
		const query = normalize(value);
		return items.filter((i) =>
			Object.values(transformer(i)).some((v) => normalize(v).includes(query)),
		);
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

<div class="syv-core-search-bar {className}">
	<div class:icon class="sb">
		<label>
			{#if icon}
				<span>
					{#if typeof icon === 'string'}
						<img src={icon} alt="icon" />
					{:else if typeof icon === 'boolean'}
						<Feather scale="1.5" icon={Search} />
					{:else}
						{@render icon()}
					{/if}
				</span>
			{/if}

			<input
				bind:this={searchbox}
				bind:value
				type="text"
				{placeholder}
				onblur={() => (show.autocomplete = false)}
				onfocus={() => (show.autocomplete = true)}
			/>
		</label>

		{#if show.autocomplete && value.length > 1 && sifted.length}
			<div class="autocomplete">
				{#each sifted.map(transformer) as { slug, title } (slug)}
					<span
						onpointerdown={() => {
							value = title;
							searchbox?.blur();
						}}
					>
						{title}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</div>

{@render children?.({ query: value, index: sifted })}

<style>
	.syv-core-search-bar {
		display: grid;
		gap: 0.5em;
	}

	.sb {
		position: relative;
		display: grid;
		gap: 0.5em;
		grid-template-columns: 1fr;
		border-radius: inherit;

		&.icon {
			label {
				& > input {
					padding-left: 2.7em;
				}

				& > span:first-child {
					pointer-events: none;
					max-width: 1.5em;
					max-height: 1.5em;
					position: absolute;
					top: 50%;
					left: 0.6em;
					transform: translate(0, -50%);
					color: var(--fg-surface, rgba(255, 255, 255, 0.65));

					& > :global(*) {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		label,
		input {
			border-radius: inherit;
			color: var(--fg-surface, rgba(255, 255, 255, 0.65));
			background-color: var(--bg-overlay, #2d2f34);
		}
		label {
			position: relative;
		}
		input {
			width: 100%;
			height: 100%;
		}
	}

	/* Autocomplete */
	.autocomplete {
		z-index: 9;
		overflow-y: auto;

		width: 100%;
		max-height: 16rem;
		position: absolute;
		top: 100%;

		display: grid;
		padding: 0.5em 0;
		margin-top: 0.25rem;
		border: 1px solid var(--fg-surface, rgba(255, 255, 255, 0.65));
		border-radius: var(--b-radius);

		color: var(--fg-surface, rgba(255, 255, 255, 0.65));
		background-color: var(--bg-overlay, #2d2f34);

		& > :global(*) {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;

			padding: 0.4em 0.8em;
		}

		& > :global(:hover) {
			cursor: pointer;
			color: #ffffff;
			background: #2e69e2;
		}
	}
</style>
