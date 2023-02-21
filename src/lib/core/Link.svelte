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
		cursor: pointer;
	}
	a.disabled {
		cursor: not-allowed;
	}
</style>
