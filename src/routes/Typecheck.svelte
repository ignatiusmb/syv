<script lang="ts">
	import LazyLoad from '$lib/core/LazyLoad.svelte';
</script>

<LazyLoad
	when={false}
	files={[() => import('./ExampleDialog.svelte'), () => import('$lib/core/ScrollTop.svelte')]}
>
	{#snippet children([
		Example,
		Scroll,
		// @ts-expect-error
		Yeah,
	])}
		<Example required={false} />
		<Scroll />
	{/snippet}
</LazyLoad>
