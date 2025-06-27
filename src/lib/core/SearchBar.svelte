<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import type { SyvStyles } from '../types';
	import { on } from 'svelte/events';
	import { weave } from '../utils';

	interface Props {
		oninput(value: string): void;

		value?: string;
		placeholder?: string;
		styles?: SyvStyles<
			| 'background-color'
			| 'background-highlight'
			| 'border-color'
			| 'border-radius'
			| 'gap'
			| 'text-color'
		>;
		filter?: MouseEventHandler<HTMLButtonElement>;
		children?: import('svelte').Snippet;
	}

	let {
		oninput,

		value = '',
		placeholder = 'Type your queries here (Press "/" to focus)',
		styles = {},
		filter,
		children,
	}: Props = $props();

	const show = $state({ autocomplete: false });
</script>

<div class="syv-core-search-bar" style={weave(styles)}>
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
			type="text"
			{value}
			{placeholder}
			oninput={(e) => oninput((e.target as HTMLInputElement).value)}
			onblur={() => (show.autocomplete = false)}
			onfocus={() => (show.autocomplete = true)}
			{@attach (searchbox) => {
				return on(window, 'keydown', (event) => {
					if (document.activeElement === searchbox) {
						if (event.key === 'Escape') searchbox.blur();
					} else if (event.key === '/') {
						(event.preventDefault(), searchbox?.focus());
					}
				});
			}}
		/>
	</label>

	{#if filter}
		<button onclick={filter} aria-label="filter results">
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

	{#if show.autocomplete && value.length > 1 && children}
		<div class="autocomplete">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.syv-core-search-bar {
		position: relative;
		width: 100%;

		display: flex;
		gap: var(--gap, 0.5rem);
		align-items: center;
		border-radius: inherit;

		label,
		input {
			border-radius: inherit;
			color: var(--text-color, #e1e0e4);
			background-color: var(--background-color, #1f1f21);
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
				color: var(--text-color, #e1e0e4);
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
			color: var(--text-color, #e1e0e4);

			&:hover,
			&:focus {
				background-color: var(--background-color, #1f1f21);
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
		border: 1px solid var(--border-color, #e1e0e4);
		border-radius: var(--border-radius, 0.5rem);

		color: var(--text-color, #e1e0e4);
		background-color: var(--background-color, #1f1f21);

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
				background: var(--background-highlight, #2e69e2);
			}
		}
	}
</style>
