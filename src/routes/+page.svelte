<script lang="ts">
	import { autoresize } from '$lib/action';
	import { outside, hold } from '$lib/action/click';

	import { LazyLoad } from '$lib';
</script>

<main use:outside={() => {}}>
	<a href="/" use:hold>Home</a>

	<textarea use:autoresize />

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
