<script lang="ts">
	import { syv } from '$lib';
	import SearchBar from '$lib/core/SearchBar.svelte';
	import ExampleDialog from './ExampleDialog.svelte';

	import { autoresize } from '$lib/action';
	import { copy } from '$lib/action/click';

	let value = '';
</script>

<header>
	<h1>Syv</h1>
</header>

<article>
	<p>Syv is a complementary library for developing applications with Svelte.</p>

	<SearchBar icon filters />

	<textarea bind:value use:autoresize />

	<button use:copy={{ data: value }}>Copy to Clipboard</button>

	<button
		on:click={() => {
			syv.mount(ExampleDialog);
			syv.load(() => import('./ExampleDialog.svelte'));
		}}
	>
		Open Dialog
	</button>
</article>

<style>
	article {
		max-width: 86rem;
	}
</style>
