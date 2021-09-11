<script context="module">
	// import type { Load } from '@sveltejs/kit';
	// export const load: Load = async ({ fetch }) => {
	// 	const sections = await fetch('/docs.json').then((r) => r.json());
	// 	return { props: { sections } };
	// };
</script>

<script>
	// export let sections;
	// import Docs from '$lib/internal/Docs.svelte';

	import SearchBar from '$lib/core/SearchBar.svelte';
</script>

<!-- <Docs {sections} repo="ignatiusmb/aqua" /> -->
<main>
	<SearchBar icon filters />
</main>

<style>
	main {
		--fg-surface: #818181;
		--bg-overlay: #ffffff;
	}
	main {
		max-width: 86rem;
		width: 100%;
		display: grid;
		justify-items: center;

		padding: 2em;
		margin: 0 auto;
	}
</style>
