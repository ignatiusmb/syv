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

	/** sets rel to external and disable data-sveltekit-prefetch */
	export let external = /^https?:\/\//.test(href);
	/** @type {boolean | 'off'} - sets data-sveltekit-prefetch value */
	export let prefetch = !external;
	/** @type {boolean | 'off'} - sets data-sveltekit-noscroll value */
	export let noscroll = false;

	export { className as class };
	let className = '';

	/** @param {typeof prefetch} option */
	function assign(option) {
		if (option === false) return undefined;
		if (option === true) return '';
		return option;
	}
</script>

<a
	{href}
	aria-label={label || undefined}
	rel={external ? `external noopener${refer ? '' : ' noreferrer'}` : undefined}
	data-sveltekit-prefetch={assign(prefetch)}
	data-sveltekit-noscroll={assign(noscroll)}
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
