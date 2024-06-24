<script lang="ts" generics="T extends LazyComponent<any>[]">
	type Loaded = {
		[K in keyof T]: T[K] extends () => Promise<{ default: infer C }> ? C : never;
	};

	import type { LazyComponent } from '../types';

	interface Props {
		files: [...T];
		when?: boolean;

		loading?: import('svelte').Snippet;
		fallback?: import('svelte').Snippet<[error: any]>;
		children: import('svelte').Snippet<[loaded: Loaded]>;
	}

	const { files, when = true, loading, fallback, children }: Props = $props();

	const load = $derived(when && Array.isArray(files));
	const promises = $derived(load ? files.map((file) => file()) : []);
</script>

{#if when && promises.length}
	{#await Promise.all(promises)}
		{@render loading?.()}
	{:then components}
		{@render children(components.map((c) => c.default) as Loaded)}
	{:catch error}
		{@render fallback?.(error)}
	{/await}
{/if}
