<script lang="ts">
	import { syv as core } from '$lib';
	import SearchBar from '$lib/core/SearchBar.svelte';
	import ExampleDialog from './ExampleDialog.svelte';
	import Footer from './Footer.svelte';

	import { autoresize } from '$lib/action';
	import { outside, copy } from '$lib/action/click';

	let value = $state('');
</script>

<main use:outside={() => {}}>
	<SearchBar items={[]} transformer={() => ({})} icon />

	<textarea bind:value use:autoresize></textarea>

	<button use:copy={{ data: value }}>Copy to Clipboard</button>

	<button
		onclick={() => {
			core.mount(ExampleDialog, {
				required: true,
				// @ts-expect-error
				error: false,
			});
			core.load(import('./ExampleDialog.svelte'), {
				required: true,
				// @ts-expect-error
				error: false,
			});
			core.load(() => import('./ExampleDialog.svelte'), {
				required: true,
				// @ts-expect-error
				error: false,
			});
		}}
	>
		Open Dialog
	</button>

	<Footer />
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
		gap: 0.75rem;
		justify-items: center;

		padding: 2em;
		margin: 0 auto;
	}
</style>
