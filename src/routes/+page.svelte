<script lang="ts">
	import { syv } from '$lib';
	import ExampleDialog from './ExampleDialog.svelte';

	import { autoresize } from '$lib/action';
	import { outside, copy } from '$lib/action/click';

	let value = '';
</script>

<main use:outside={() => {}}>
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
