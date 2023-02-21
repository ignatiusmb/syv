<script lang="ts">
	import type { LazyComponent } from '../types';

	export let files: LazyComponent<any>[];
	export let when = true;

	let promises: undefined | ReturnType<(typeof files)[number]>[];
	$: if (when && !promises && Array.isArray(files)) {
		promises = files.map((file) => file());
	}
</script>

{#if when && promises && promises.length}
	{#await Promise.all(promises)}
		<slot name="loading" />
	{:then components}
		<slot loaded={components.map((c) => c.default)} />
	{:catch error}
		<slot name="fallback" {error} />
	{/await}
{/if}
