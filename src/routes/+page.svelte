<script lang="ts">
	import { autoresize } from '$lib/action';
	import { outside, copy } from '$lib/action/click';

	import { LazyLoad } from '$lib';

	let value = '';
</script>

<main use:outside={() => {}}>
	<textarea bind:value use:autoresize />

	<button use:copy={{ data: value }}>Copy to Clipboard</button>

	<LazyLoad files={[() => import('$lib/core/Dialog.svelte')]} let:loaded>
		<svelte:component this={loaded[0]} />
	</LazyLoad>
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
