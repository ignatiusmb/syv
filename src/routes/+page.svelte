<script lang="ts">
	import Docs from './Docs.svelte';

	export let data;
</script>

<header>
	<h1>Syv</h1>
	<p>Svelte Complementary Library</p>
</header>

<Docs repo="ignatiusmb/syv" sections={data.docs} />

<style>
	header {
		max-width: 78rem;
		width: 100%;
		padding-top: 2rem;
		margin: 0 auto;
		font-family: 'Karla';
		font-size: 1.25rem;
	}
	h1 {
		margin-bottom: 1rem;
		font-size: 4rem;
	}
</style>
