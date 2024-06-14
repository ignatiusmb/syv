<script lang="ts">
	interface Props {
		size: number | string;
		contents: string;
		label?: string;
		flip?: undefined | 'x' | 'y';
	}

	let { size, contents, label = '', flip = undefined }: Props = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	aria-label={label || null}
	style:transform={flip ? `scale${{ x: 'Y', y: 'X' }[flip]}(-1)` : ''}
	xmlns="http://www.w3.org/2000/svg"
>
	{@html contents}
</svg>
