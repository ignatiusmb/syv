<script>
	// import '@ignatiusmb/styles/core.css';

	import { ScrollTop } from '$lib';
</script>

<ScrollTop />

<slot />

<style>
	:global(body, #svelte) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: var(--aqua-default);
		background-color: #242424;
	}
</style>
