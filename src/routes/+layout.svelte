<script lang="ts">
	import '@ignatiusmb/styles/core.css';

	const { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		margin: 0;
		font-family: var(--aqua-default);
		background-color: #242424;
	}
</style>
