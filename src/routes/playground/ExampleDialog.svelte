<script lang="ts">
	import Dialog from '$lib/core/Dialog.svelte';

	export let required: boolean = false;
</script>

<Dialog {required} let:forward>
	<h2>Hello from Dialog</h2>

	<input type="text" />

	<button on:click={forward}>Close Dialog</button>
</Dialog>
