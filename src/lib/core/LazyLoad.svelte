<script>
	/** @type {Array<() => Promise<typeof import('*.svelte')>>} */
	export let files;
	export let when = true;

	/** @type {Promise<typeof import('*.svelte')>[] | undefined} */
	let promises;
	$: if (when && !promises && Array.isArray(files)) {
		promises = files.map((file) => file());
	}
</script>

{#if when && promises && promises.length}
	{#await Promise.all(promises)}
		<slot name="loading" />
	{:then components}
		<slot loaded={components.map((c) => c.default)} />
	{:catch error}
		<slot name="fallback" {error} />
	{/await}
{/if}
