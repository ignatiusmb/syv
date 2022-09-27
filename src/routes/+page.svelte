<script lang="ts">
	import { autoresize } from '$lib/action';
	import { outside, hold } from '$lib/action/click';
</script>

<main use:outside={() => {}}>
	<a href="/" use:hold>Home</a>

	<textarea use:autoresize />
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
