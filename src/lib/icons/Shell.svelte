<script lang="ts">
	import { scope } from '$lib/utils';

	export let icon: {
		contents?: string;
		paths?: Array<{}>;
		polygons?: Array<{}>;
		attrs?: {
			width: number;
			height: number;
			fill: string;
			stroke: {
				color: string;
				width: number;
				linecap: string;
				linejoin: string;
			};
		};
	};

	export let scale = 1;
	export let label = '';
	export let style = '';
	export let flip: undefined | 'x' | 'y' = undefined;
	export let variant: undefined | 'invert' = undefined;
	export { className as class };
	let className = '';

	let x = 0;
	let y = 0;

	$: [w, h] = scope(() => {
		const { width = 1, height = 1 } = icon.attrs || {};
		const ratio = Math.max(width, height) / 16 || 1;
		return [(width / ratio) * scale, (height / ratio) * scale];
	});

	$: data = scope(() => {
		if (!icon.contents) return '';

		const table: Record<string, string> = {};
		const assign = cursor();

		return icon.contents
			.replace(/\s(?:xml:)?id=["']?([^"')\s]+)/g, (_, id) => ` id="${(table[id] = assign())}"`)
			.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, (m, raw, _, pointer) => {
				const id: string = raw || pointer;
				return !id || !table[id] ? m : `#${table[id]}`;
			});

		function cursor() {
			let data = 0xd4937;
			return () => {
				return `fa-${(data++).toString(16)}`;
			};
		}
	});
</script>

<svg
	{x}
	{y}
	{style}
	width={w}
	height={h}
	version="1.1"
	aria-label={label}
	xmlns="http://www.w3.org/2000/svg"
	role={label ? 'img' : 'presentation'}
	style:display="inline-block"
	style:fill="currentColor"
	style:font-size="{scale}rem"
	style:filter={variant === 'invert' ? 'invert(1)' : ''}
	style:transform={flip ? `scale${{ x: 'Y', y: 'X' }[flip]}(-1)` : ''}
	class={className}
	viewBox="0 0 {w} {h}"
>
	<slot>
		{#if icon}
			<!-- 
			{#each icon.paths || [] as path}
				<path {...path} />
			{/each}
			{#each icon.polygons || [] as polygon}
				<polygon {...polygon} />
			{/each} 
			-->
			{#if data}<g>{@html data}</g>{/if}
		{/if}
	</slot>
</svg>
