<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import FluentSync from './FluentSync.svelte';

	type IconModule = $$Generic<{
		[i: string]: Pick<ComponentProps<FluentSync>, 'size' | 'contents'>;
	}>;
	type Variant = $$Generic<keyof IconModule>;
	export let icon: Promise<IconModule>;
	export let variant: Variant;

	export let label = '';
	export let flip: undefined | 'x' | 'y' = undefined;
	export { className as class };
	let className = '';
</script>

{#await icon}
	<slot name="loading" />
{:then loaded}
	<FluentSync {...loaded[variant]} {label} {flip} class={className} />
{:catch error}
	<slot name="error">
		<pre>{JSON.stringify(error)}</pre>
	</slot>
{/await}
