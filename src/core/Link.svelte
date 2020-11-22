<script>
	export let href = '';
	export let download = null;
	export let newTab = false;
	export let label = null;
	export let inherit = false;
	export let invert = false;

	// Sapper specific
	export let noscroll = false;
</script>

<a
	{href}
	{download}
	target={newTab ? '_blank' : undefined}
	sapper:noscroll={noscroll ? 'on' : undefined}
	rel={href.includes('//') ? 'noopener noreferrer' : 'prefetch'}
	aria-label={label}
	class="lmns lmns-link"
	class:disabled={!href}
	class:inherit
	class:invert>
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
