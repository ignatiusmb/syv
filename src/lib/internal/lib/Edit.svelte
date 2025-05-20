<script lang="ts">
	interface Props {
		repo: string;
		path: string;
	}
	const { repo, path }: Props = $props();
	const link = `https://github.com/${repo}/edit/master`;
</script>

<a href="{link}/{path}" aria-label="edit">
	<svg
		viewBox="0 0 256 256"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="16"
	>
		<circle cx="128" cy="128" r="96" />
		<path d="M176,211.16V176a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v35.16" />
		<path d="M96,168V144a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v24" />
		<path d="M147.84,136l-12-57.63c-1.77-8.49-13.89-8.49-15.66,0l-12,57.63" />
	</svg>
</a>

<style>
	a {
		display: flex;
		align-items: center;
		color: var(--aqua-primary);
	}
</style>
