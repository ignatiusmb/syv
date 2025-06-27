<script lang="ts">
	import Dialog from '$lib/core/Dialog.svelte';
	import type { ComponentProps } from 'svelte';

	interface Props extends Omit<ComponentProps<typeof Dialog>, 'children'> {
		required: boolean;
	}
	let { required = false, ...props }: Props = $props();
</script>

<Dialog {required} {...props}>
	<h2>Hello from Dialog</h2>

	<input type="text" />

	<button onclick={props.onclose}>Close Dialog</button>
</Dialog>
