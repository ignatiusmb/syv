<script lang="ts">
	import type { AnyLazyComponent } from '../types';

	interface Props {
		files: AnyLazyComponent[];
		when?: boolean;

		loading?: import('svelte').Snippet;
		fallback?: import('svelte').Snippet<[error: any]>;
		children: import('svelte').Snippet<[loaded: any]>;
	}

	const { files, when = true, loading, fallback, children }: Props = $props();

	const load = $derived(when && Array.isArray(files));
	const promises = $derived(load ? files.map((file) => file()) : []);
</script>

{#if when && promises.length}
	{#await Promise.all(promises)}
		{@render loading?.()}
	{:then components}
		{@render children(components.map((c) => c.default))}
	{:catch error}
		{@render fallback?.(error)}
	{/await}
{/if}
