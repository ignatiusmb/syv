<script>
	import Dialog from '$lib/core/Dialog.svelte';
</script>

<Dialog let:close>
	<h2>Hello from Dialog</h2>

	<button on:click={close()}>Close Dialog</button>
</Dialog>
