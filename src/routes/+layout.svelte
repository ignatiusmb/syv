<script>
	// import '@ignatiusmb/styles/core.css';
</script>

<slot />

<style>
	:global(*) {
		box-sizing: border-box;
	}
	:global(body, #svelte) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		margin: 0;
		font-family: var(--aqua-default);
		background-color: #242424;
	}
</style>
