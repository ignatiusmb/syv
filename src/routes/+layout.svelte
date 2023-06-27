<script>
	import '@ignatiusmb/styles/core.css';

	import Footer from './Footer.svelte';
</script>

<main>
	<slot />

	<Footer />
</main>

<style>
	main {
		--fg-surface: #818181;
		--bg-overlay: #ffffff;

		min-height: 100vh;
		width: 100%;

		display: grid;
		gap: 0.75rem;
		justify-items: center;
		padding: 2em;
		margin: 0 auto;
		background-color: #242424;
		color: rgba(255, 255, 255, 0.9);
		font-family: sans-serif;
	}
</style>
