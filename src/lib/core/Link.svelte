<script>
	export let href = '';
	export let label = '';
	export let download = null;
	export let newTab = false;
	export let inherit = false;
	export let invert = false;

	export let noscroll = false;
	export let refer = false;
	$: external = /^https?:\/\//.test(href);
</script>

<a
	{href}
	{download}
	target={newTab ? '_blank' : undefined}
	sveltekit:noscroll={noscroll || undefined}
	sveltekit:prefetch={external || undefined}
	rel={external ? `noopener ${refer ? '' : 'noreferrer'}` : undefined}
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
