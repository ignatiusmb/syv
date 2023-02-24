<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import FeatherSync from './FeatherSync.svelte';

	export let icon: Promise<Pick<ComponentProps<FeatherSync>, 'contents' | 'attrs'>>;

	export let label = '';
	export let style = '';
	export let girth: string | number = 1.5;
	export let scale: string | number = 1.5;
	export let flip: undefined | 'x' | 'y' = undefined;
	export { className as class };
	let className = '';
</script>

{#await icon}
	<slot name="loading" />
{:then { attrs, contents }}
	<FeatherSync {contents} {attrs} {label} {style} {girth} {scale} {flip} class={className} />
{:catch error}
	<slot name="error">
		<pre>{JSON.stringify(error)}</pre>
	</slot>
{/await}
