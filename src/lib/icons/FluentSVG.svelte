<script lang="ts">
	export let size: number | string;
	export let contents: string;

	export let label = '';
	export let flip: undefined | 'x' | 'y' = undefined;
	export { className as class };
	let className = '';
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	class={className || null}
	aria-label={label || null}
	style:transform={flip ? `scale${{ x: 'Y', y: 'X' }[flip]}(-1)` : ''}
	xmlns="http://www.w3.org/2000/svg"
>
	{@html contents}
</svg>
