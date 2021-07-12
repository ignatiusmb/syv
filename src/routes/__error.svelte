<script context="module" lang="ts">
	import type { ErrorLoad } from '@sveltejs/kit';
	export const load: ErrorLoad = (props) => ({ props });
</script>

<script lang="ts">
	export let status: number, error: Error;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<article>
	<h1>{status}</h1>
	<p>{error.message}</p>
</article>

<style>
	article {
		margin-top: auto;
		text-align: center;
	}

	h1 {
		font-family: var(--aqua-monospace);
		font-size: 5em;
	}
	p {
		font-size: 2em;
	}
</style>
