<script lang="ts">
	import { Edit } from '../../icons/feather';
	import Feather from '../../icons/Feather.svelte';

	interface Props {
		repo: string;
		path: string;
	}
	const { repo, path }: Props = $props();
	const link = `https://github.com/${repo}/edit/master`;
</script>

<a href="{link}/{path}">
	<Feather icon={Edit} />
</a>

<style>
	a {
		display: flex;
		align-items: center;
		color: var(--aqua-primary);
	}
</style>
