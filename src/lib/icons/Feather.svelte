<script lang="ts">
	export let icon: () => Promise<{
		name?: string;
		contents?: string;
		attrs?: {
			xmlns: string;
			width: number;
			height: number;
			viewBox: string;
			fill: string;
			stroke: string;
			'stroke-width': number;
			'stroke-linecap': string;
			'stroke-linejoin': string;
		};
	}>;

	export let label = '';
	export let style = '';
	export let girth: string | number = 1.5;
	export let scale: string | number = 1;
	export let flip: undefined | 'x' | 'y' = undefined;
	export let variant: undefined | 'invert' = undefined;
	export { className as class };
	let className = '';

	function scope<T>(fn: () => T) {
		return fn();
	}

	$: promise = icon();
</script>

{#await promise}
	<slot name="loading" />
{:then { attrs, contents }}
	{@const { width, height } = scope(() => {
		const { width: w = 1, height: h = 1 } = attrs || {};
		const ratio = Math.max(w, h) / 16 || 1;
		return {
			width: +scale * (w / ratio),
			height: +scale * (h / ratio),
		};
	})}
	{@const data = Object.assign(attrs || {}, {
		style,
		width,
		height,
		'aria-label': label || null,
		'stroke-width': girth,
		role: label ? 'img' : 'presentation',
		class: className || null,
	})}

	<svg
		{...data}
		version="1.1"
		style:filter={variant === 'invert' ? 'invert(1)' : ''}
		style:transform={flip ? `scale${{ x: 'Y', y: 'X' }[flip]}(-1)` : ''}
	>
		<slot {attrs} {contents}>
			{#if contents}<g>{@html contents}</g>{/if}
		</slot>
	</svg>
{:catch error}
	<slot name="error">
		<pre>{JSON.stringify(error)}</pre>
	</slot>
{/await}
