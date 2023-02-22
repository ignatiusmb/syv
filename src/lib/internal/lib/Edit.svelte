<script lang="ts">
	import Feather from '../../icons/Feather.svelte';

	export let repo: string;
	export let path: string;

	const link = `https://github.com/${repo}/edit/master`;
</script>

<a href="{link}/{path}">
	<Feather icon={import('../../icons/feather/edit')} />
</a>

<style>
	a {
		display: flex;
		align-items: center;
		color: var(--aqua-primary);
	}
</style>
