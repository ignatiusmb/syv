<script lang="ts">
	import { dialog } from '$lib';
	import SearchBar from '$lib/core/SearchBar.svelte';

	import Empty from './Empty.svelte';
	import ExampleDialog from './ExampleDialog.svelte';
	import Footer from './Footer.svelte';

	import { autoresize, copy, outside } from '$lib/action';

	let value = $state('');
</script>

<main use:outside={() => {}}>
	<SearchBar items={[]} sieve={() => true} />

	<textarea bind:value use:autoresize></textarea>

	<button use:copy={{ data: value }}>Copy to Clipboard</button>

	<button
		onclick={() => {
			dialog.mount(Empty);
			// @ts-expect-error
			dialog.mount(ExampleDialog);
			dialog.mount(ExampleDialog, {
				required: true,
				// @ts-expect-error
				error: false,
			});
			dialog.load(import('./ExampleDialog.svelte'), {
				required: true,
				// @ts-expect-error
				error: false,
			});
			dialog.load(() => import('./ExampleDialog.svelte'), {
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

		padding: 2rem;
		margin: 0 auto;
	}
</style>
