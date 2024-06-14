<script lang="ts">
	import Dialog from '$lib/core/Dialog.svelte';

	interface Props {
		required: boolean;
	}
	let { required = false }: Props = $props();
</script>

<Dialog {required}>
	{#snippet children({ forward })}
		<h2>Hello from Dialog</h2>

		<input type="text" />

		<button onclick={forward}>Close Dialog</button>
	{/snippet}
</Dialog>
