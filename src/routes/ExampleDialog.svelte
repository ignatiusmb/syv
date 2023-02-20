<script>
	import Dialog from '$lib/core/Dialog.svelte';

	export let required = false;
</script>

<Dialog {required} let:close>
	<h2>Hello from Dialog</h2>

	<input type="text" />

	<button on:click={close()}>Close Dialog</button>
</Dialog>
