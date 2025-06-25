<script lang="ts">
	import Dialog from '$lib/core/Dialog.svelte';
	import type { ComponentProps } from 'svelte';

	type Props = Omit<ComponentProps<typeof Dialog>, 'children'> & {
		required: boolean;
	};
	let { required = false }: Props = $props();
</script>

<Dialog {required}>
	{#snippet children({ close })}
		<h2>Hello from Dialog</h2>

		<input type="text" />

		<button onclick={close}>Close Dialog</button>
	{/snippet}
</Dialog>
