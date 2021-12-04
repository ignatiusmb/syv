<script>
	export let href = '';
	export let label = '';
	export let external = /^https?:\/\//.test(href);
	export let download = false;
	export let newTab = false;
	export let inherit = false;
	export let invert = false;

	export let noscroll = false;
	export let refer = false;
	export { className as class };
	let className = '';
</script>

<a
	{href}
	sveltekit:noscroll={noscroll || undefined}
	sveltekit:prefetch={!external || undefined}
	rel={external ? `external noopener${refer ? '' : ' noreferrer'}` : undefined}
	aria-label={label || undefined}
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
