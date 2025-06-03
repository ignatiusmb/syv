<script lang="ts">
	import { dialog } from '$lib';
	import SearchBar from '$lib/core/SearchBar.svelte';

	import Empty from './Empty.svelte';
	import ExampleDialog from './ExampleDialog.svelte';

	import { autoresize, copy } from '$lib/attachment';

	let value = $state('');
</script>

<SearchBar items={[]} sieve={() => true} />

<textarea bind:value {@attach autoresize}></textarea>

<button {@attach copy({ data: value })}>Copy to Clipboard</button>

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

<style>
</style>
