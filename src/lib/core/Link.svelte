<script>
	export let href = '';
	/** passed through to aria-label */
	export let label = '';
	/** adds noreferrer to rel, only applied when external is true */
	export let refer = false;
	/** sets download attribute */
	export let download = false;
	/** sets target as '_blank' */
	export let newTab = false;

	/** sets rel to external and enable data-sveltekit-reload */
	export let external = /^https?:\/\//.test(href);
	/**
	 * sets data-sveltekit-preload-[code,data] value
	 * @type {
	 * 	| { code?: 'eager' | 'viewport'; data?: 'hover' | 'tap' }
	 * }
	 */
	export let preload = { code: 'hover' };
	/** @type {undefined | true | 'off'} - sets data-sveltekit-noscroll value */
	export let noscroll = undefined;

	export { className as class };
	let className = '';
</script>

<a
	{href}
	tabindex={!href ? -1 : null}
	aria-label={label || undefined}
	rel={external ? `external noopener${refer ? '' : ' noreferrer'}` : undefined}
	data-sveltekit-reload={external || 'off'}
	data-sveltekit-preload-code={preload.code}
	data-sveltekit-preload-data={preload.data}
	data-sveltekit-noscroll={noscroll}
	download={download || undefined}
	target={newTab ? '_blank' : undefined}
	class:disabled={!href}
	class="syv-core-link {className}"
>
	<slot />
</a>

<style>
	a {
		user-select: none;
		overflow-y: hidden;
		width: 100%;

		display: inline-flex;
		padding: 0.5em 1em;
		border-radius: inherit;
		transform: translateY(-2ch);
		transition: all var(--t-duration, 300ms) ease-in-out;

		background-color: var(--bg-base, #1f2023);
		text-transform: uppercase;
		color: rgba(0, 0, 0, 0);
		text-shadow: 0 2ch 0 var(--fg-surface, rgba(255, 255, 255, 0.65));
	}
	a:hover,
	a:active {
		color: var(--theme-secondary, #dc143c);
		text-shadow: 0 2ch 0 rgba(0, 0, 0, 0);
		transform: translateY(0);
	}

	a.disabled {
		opacity: 0.4;
		pointer-events: none;
		text-transform: none;
	}
	a.disabled:hover,
	a.disabled:active {
		box-shadow: none;
		transform: none;
	}
</style>
