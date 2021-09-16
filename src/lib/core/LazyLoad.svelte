<script>
	export let file;
	export let when = true;

	let component;
	$: if (when && !component) component = file();
</script>

{#if component && when}
	{#await component then { default: loaded }}
		<slot {loaded} />
	{/await}
{/if}
