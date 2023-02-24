<script lang="ts">
	interface IconData {
		size: number | string;
		contents: string;
	}
	export let icon: IconData | Promise<IconData> | (() => Promise<IconData>);

	export let label = '';
	export let flip: undefined | 'x' | 'y' = undefined;
	export { className as class };
	let className = '';
</script>

{#await typeof icon === 'function' ? icon() : icon}
	<slot name="loading" />
{:then { size, contents }}
	<svg
		width={size}
		height={size}
		version="1.1"
		viewBox="0 0 {size} {size}"
		class={className || null}
		aria-label={label || null}
		style:transform={flip ? `scale${{ x: 'Y', y: 'X' }[flip]}(-1)` : ''}
		xmlns="http://www.w3.org/2000/svg"
	>
		{@html contents}
	</svg>
{:catch error}
	<slot name="error">
		<pre>{JSON.stringify(error)}</pre>
	</slot>
{/await}
