<script lang="ts">
	export let icon: {
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

	export let label = '';
	export let style = '';
	export let girth: string | number = 1.5;
	export let scale: string | number = 1.5;
	export let flip: undefined | 'x' | 'y' = undefined;
	export { className as class };
	let className = '';

	function scope<T>(fn: () => T) {
		return fn();
	}

	$: ({ width, height } = scope(() => {
		const { width: w, height: h } = icon.attrs || {};
		const ratio = Math.max(w, h) / 16 || 1;
		return {
			width: +scale * (w / ratio),
			height: +scale * (h / ratio),
		};
	}));
	$: data = {
		...icon.attrs,
		style,
		width,
		height,
		'aria-label': label || null,
		'stroke-width': girth,
		role: label ? 'img' : 'presentation',
		class: className || null,
	};
</script>

<svg {...data} style:transform={flip ? `scale${{ x: 'Y', y: 'X' }[flip]}(-1)` : ''}>
	{@html icon.contents}
</svg>
