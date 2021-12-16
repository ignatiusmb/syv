<script>
	export let href = '';
	/** passed through to aria-label */
	export let label = '';
	/** sets rel to external and disable sveltekit:prefetch */
	export let external = /^https?:\/\//.test(href);
	/** adds noreferrer to rel, only applied when external is true */
	export let refer = false;
	/** sets sveltekit:noscroll value */
	export let noscroll = false;
	/** sets download attribute */
	export let download = false;
	/** sets target as '_blank' */
	export let newTab = false;

	/** adds inherit class to element */
	export let inherit = false;
	/** adds invert class to element */
	export let invert = false;

	export { className as class };
	let className = '';
</script>

<a
	{href}
	aria-label={label || undefined}
	rel={external ? `external noopener${refer ? '' : ' noreferrer'}` : undefined}
	sveltekit:prefetch={!external || undefined}
	sveltekit:noscroll={noscroll || undefined}
	download={download || undefined}
	target={newTab ? '_blank' : undefined}
	class:invert
	class:inherit
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
	a.inherit {
		color: inherit !important;
	}
	a.invert:hover {
		filter: invert() hue-rotate(180deg);
	}
</style>
