<script lang="ts">
	export let repo: string;
	export let path: string;

	import Link from '../../core/Link.svelte';
	import Edit from '../../icons/feather/Edit.svelte';

	const link = `https://github.com/${repo}/edit/master`;
</script>

<span>
	<Link href="{link}/{path}">
		<Edit />
	</Link>
</span>

<style>
	span {
		display: flex;
		align-items: center;
		color: var(--aqua-primary);
	}
	span :global(a) {
		display: flex;
	}
</style>
