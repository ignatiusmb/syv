<script lang="ts">
	import { syv as core } from '$lib';
	import LazyLoad from '$lib/core/LazyLoad.svelte';
	import SearchBar from '$lib/core/SearchBar.svelte';

	import Empty from './Empty.svelte';
	import ExampleDialog from './ExampleDialog.svelte';
	import Footer from './Footer.svelte';

	import { autoresize, copy, outside } from '$lib/action';

	let value = $state('');
</script>

<main use:outside={() => {}}>
	<LazyLoad
		files={[() => import('./ExampleDialog.svelte'), () => import('$lib/core/ScrollTop.svelte')]}
	>
		{#snippet children([
			Example,
			Scroll,
			// @ts-expect-error
			Yeah,
		])}
			<Example required={false} />
			<Scroll />
		{/snippet}
	</LazyLoad>

	<SearchBar items={[]} sieve={() => true} />

	<textarea bind:value use:autoresize></textarea>

	<button use:copy={{ data: value }}>Copy to Clipboard</button>

	<button
		onclick={() => {
			core.mount(Empty);
			// @ts-expect-error
			core.mount(ExampleDialog);
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

		padding: 2rem;
		margin: 0 auto;
	}
</style>
