<script>
	let className = '';
	export { className as class };
	export let href = '';
	export let label = '';
	export let download = false;
	export let newTab = false;
	export let invert = false;
	export let disabled = false;

	import Link from './Link.svelte';
</script>

<span class="syv-core-button-link {className}" class:disabled>
	<Link href={!disabled ? href : ''} inherit {newTab} {label} {download} {invert}>
		<slot />
	</Link>
</span>

<style>
	span {
		overflow-y: hidden;
		display: inline-flex;
		border-radius: inherit;
		background-color: var(--bg-base, #1f2023);
		text-transform: uppercase;
		color: rgba(0, 0, 0, 0);
	}
	span > :global(a) {
		user-select: none;
		width: 100%;
		padding: 0.5em 1em;
		text-shadow: 0 2ch 0 var(--fg-surface, rgba(255, 255, 255, 0.65));
		transform: translateY(-2ch);
		transition: all var(--t-duration, 300ms) ease-in-out;
	}
	span:hover,
	span:active {
		color: var(--theme-secondary, #dc143c);
	}
	span:hover > :global(a),
	span:active > :global(a) {
		text-shadow: 0 2ch 0 rgba(0, 0, 0, 0);
		transform: translateY(0);
	}

	span.disabled {
		opacity: 0.4;
		cursor: not-allowed;
		pointer-events: none;
		text-transform: none;
	}
	span.disabled:hover,
	span.disabled:active {
		box-shadow: none;
		transform: none;
	}
</style>
