<script>
	import '@ignatiusmb/styles/core.css';
</script>

<main>
	<slot />
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
