<script lang="ts" generics="T extends { slug: string }">
	interface Props {
		items: T[];
		value?: string;
		placeholder?: string;

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
		<svg
			viewBox="0 0 256 256"
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="16"
		>
			<circle cx="112" cy="112" r="80" />
			<line x1="168.57" y1="168.57" x2="224" y2="224" />
		</svg>

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
			<svg
				viewBox="0 0 256 256"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			>
				<line x1="128" y1="120" x2="128" y2="216" />
				<line x1="128" y1="40" x2="128" y2="88" />
				<line x1="200" y1="200" x2="200" y2="216" />
				<line x1="200" y1="40" x2="200" y2="168" />
				<line x1="224" y1="168" x2="176" y2="168" />
				<line x1="56" y1="168" x2="56" y2="216" />
				<line x1="56" y1="40" x2="56" y2="136" />
				<line x1="32" y1="136" x2="80" y2="136" />
				<line x1="152" y1="88" x2="104" y2="88" />
			</svg>
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
			width: 3rem;
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
