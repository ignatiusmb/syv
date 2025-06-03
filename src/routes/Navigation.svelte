<script lang="ts">
</script>

<nav>
	<label>
		<input type="text" aria-label="search" placeholder="Search" />
	</label>
</nav>

<style>
	nav {
		--pad: 0.375rem;
		--fg-surface: rgba(200, 200, 200, 1);

		grid-column: content;
		z-index: 1;
		width: 100%;
		position: sticky;
		top: 0;
		display: flex;
		background: var(--bg-base);
	}

	label {
		display: flex;
		align-items: center;
		width: 100%;

		padding: var(--pad);
		margin: 0.5rem 0.25rem;
		border-radius: 0.5rem;
		color: var(--fg-surface);
		background: var(--bg-surface);
	}

	input {
		outline: none;
		background: inherit;
	}
</style>
