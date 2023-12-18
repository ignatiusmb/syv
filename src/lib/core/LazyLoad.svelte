<script lang="ts">
	import type { AnyLazyComponent } from '../types';

	const { files, when = true } = $props<{
		files: AnyLazyComponent[];
		when?: boolean;
	}>();

	const load = $derived(when && Array.isArray(files));
	const promises = $derived(load ? files.map((file) => file()) : []);
</script>

{#if when && promises.length}
	{#await Promise.all(promises)}
		<slot name="loading" />
	{:then components}
		<slot loaded={components.map((c) => c.default)} />
	{:catch error}
		<slot name="fallback" {error} />
	{/await}
{/if}
