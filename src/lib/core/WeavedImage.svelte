<script>
	// ref: https://css-tricks.com/weaving-one-element-over-and-under-another-element/
	export let src = '';
	export let alt = '';
	import Image from './Image.svelte';
</script>

<div class="syv-core-weaved-image">
	<Image {src} {alt} absolute />
	<div class="absolute border" />

	<div class="absolute grid">
		<div class="empty" />
		<div />
		<div />
		<div class="empty" />
	</div>

	<div class="absolute blend">
		<Image {src} {alt} absolute />
		<div class="absolute grid">
			<div />
			<div class="empty" />
			<div class="empty" />
			<div />
		</div>
	</div>
</div>

<style>
	.syv-core-weaved-image {
		width: 15em;
		height: 15em;
		position: relative;
		margin: 3em auto;
	}
	.syv-core-weaved-image :global(img) {
		border: none;
		border-radius: 0;
		box-shadow: 0 0 1em rgba(255, 255, 255, 0.7);
	}

	div.absolute {
		width: 100%;
		height: 100%;
		position: absolute;
	}
	div.border {
		border: 0.75em solid crimson;
		border-radius: 0.5em;
		box-shadow: 0 0 0.5em crimson, inset 0 0 1em crimson;
		transform: rotate(45deg);
	}
	div.grid {
		position: absolute;
		display: grid;
		grid: 1fr 1fr / 1fr 1fr;
	}
	div.blend {
		mix-blend-mode: multiply;
	}
	div.empty {
		background-color: white;
	}
</style>
