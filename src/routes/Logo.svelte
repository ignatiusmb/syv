<script lang="ts">
	interface Props {
		size?: string;
	}

	let { size = '2rem' }: Props = $props();
</script>

<svg
	aria-label="syv"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="-128 -128 256 256"
	width={size}
	height={size}
	fill="none"
	stroke="#ff3e00"
	stroke-width="8"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<circle r="92" fill="none" stroke-width="16" />

	<g fill="#ff3e00">
		<defs>
			<path
				id="leaf"
				d="M 0 -4 Q 32 -8 64 24 C 16 -16 6 24 0 80 C -6 24 -16 -16 -64 24 Q -32 -8 0 -4 Z"
			/>
		</defs>

		<use href="#leaf" transform="rotate(60) translate(0, -88)" />
		<use href="#leaf" transform="rotate(180) translate(0, -88)" />
		<use href="#leaf" transform="rotate(-60) translate(0, -88)" />
	</g>

	<polygon
		points="-12,-20 12,-20 23,0 12,20 -12,20 -23,0"
		fill="#e1e0e4"
		stroke="#e1e0e4"
		transform="rotate(0)"
	/>
</svg>
