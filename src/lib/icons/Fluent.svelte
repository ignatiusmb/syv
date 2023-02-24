<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import FluentSVG from './FluentSVG.svelte';

	type IconModule = $$Generic<{
		[i: string]: Pick<ComponentProps<FluentSVG>, 'size' | 'contents'>;
	}>;
	type Variant = $$Generic<keyof IconModule>;
	export let icon: Promise<IconModule>;
	export let variant: Variant;

	export let label = '';
	export let flip: undefined | 'x' | 'y' = undefined;
	export { className as class };
	let className = '';
</script>

{#if 'then' in icon}
	{#await icon}
		<slot name="loading" />
	{:then loaded}
		<FluentSVG {...loaded[variant]} {label} {flip} class={className} />
	{:catch error}
		<slot name="error">
			<pre>{JSON.stringify(error)}</pre>
		</slot>
	{/await}
{:else}
	<FluentSVG {...icon} {label} {flip} class={className} />
{/if}
