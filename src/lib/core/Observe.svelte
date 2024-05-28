<script lang="ts">
	interface Props {
		/** unobserve after first sighting */
		once?: boolean;
		margin?: string;
		class?: string;
		children: import('svelte').Snippet<[sighted: typeof sighted]>;
	}

	const { once = false, margin = '0px', class: className = '', children }: Props = $props();

	let sighted = $state(false);
	let container: undefined | HTMLElement = $state();

	$effect(() => {
		const observer = new IntersectionObserver(
			([{ isIntersecting }]) => {
				sighted = isIntersecting;
				if (sighted && once && container) {
					observer.unobserve(container);
				}
			},
			{ rootMargin: margin },
		);
		container && observer.observe(container);
		return () => observer.unobserve(container!);
	});
</script>

<div bind:this={container} class="syv-core-observe {className}">
	{@render children(sighted)}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
		border-radius: inherit;
	}
</style>
