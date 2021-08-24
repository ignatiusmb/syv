<script>
	let className = '';
	export { className as class };
	export let once = false;
	export let top = 0;
	export let right = 0;
	export let bottom = 0;
	export let left = 0;

	let sighted = false;
	let container;

	import { onMount } from 'svelte';
	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined') {
			const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;
			const observer = new IntersectionObserver(
				(entries) => {
					sighted = entries[0].isIntersecting;
					if (sighted && once) observer.unobserve(container);
				},
				{ rootMargin }
			);
			observer.observe(container);
			return () => observer.unobserve(container);
		}
		function handler() {
			const bcr = container.getBoundingClientRect();
			sighted =
				bcr.bottom + bottom > 0 &&
				bcr.right + right > 0 &&
				bcr.top - top < window.innerHeight &&
				bcr.left - left < window.innerWidth;
			if (sighted && once) window.removeEventListener('scroll', handler);
		}
		window.addEventListener('scroll', handler);
		return () => window.removeEventListener('scroll', handler);
	});
</script>

<div bind:this={container} class="syv-core-observe {className}">
	<slot {sighted} />
</div>

<style>
	div {
		width: 100%;
		height: 100%;
		border-radius: inherit;
	}
</style>
