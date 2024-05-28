<script lang="ts">
	interface Props {
		icon: {
			contents: string;
			attrs: {
				xmlns: string;
				width: number;
				height: number;
				viewBox: string;
				fill: string;
				stroke: string;
				'stroke-width': number;
				'stroke-linecap': 'inherit' | 'butt' | 'round' | 'square';
				'stroke-linejoin': 'inherit' | 'round' | 'miter' | 'bevel';
			};
		};

		label?: string;
		style?: string;
		girth?: string | number;
		scale?: string | number;
		flip?: undefined | 'x' | 'y';
		class?: string;
	}

	const {
		icon,
		label = '',
		style = '',
		girth = 1.5,
		scale = 1.5,
		flip = undefined,
		class: className = '',
	}: Props = $props();

	const { width, height } = $derived.by(() => {
		const { width: w, height: h } = icon.attrs || {};
		const ratio = Math.max(w, h) / 16 || 1;
		return {
			width: +scale * (w / ratio),
			height: +scale * (h / ratio),
		};
	});
	const data = $derived({
		...icon.attrs,
		style,
		width,
		height,
		'aria-label': label || null,
		'stroke-width': girth,
		role: label ? 'img' : 'presentation',
		class: className || null,
	});
</script>

<svg {...data} style:transform={flip ? `scale${{ x: 'Y', y: 'X' }[flip]}(-1)` : ''}>
	{@html icon.contents}
</svg>
