<script context="module">
	const time = $state({ start: Date.now() });
	const reset = () => (time.start = Date.now());
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		runner?: 'background' | 'interactive';
		refresh?: number;
		interval?: number;
		task?(): void;
		children?: import('svelte').Snippet<[remaining: number]>;
	}

	const {
		runner = 'background',
		refresh = 10 * 60 * 1000,
		interval = refresh / 60,
		task = () => {},
		children,
	}: Props = $props();

	let timeout: number;

	const binding = () => runner === 'interactive' && reset();

	async function worker() {
		const diff = Date.now() - time.start;
		if (diff >= refresh) task(), reset();
		timeout = setTimeout(worker, interval);
	}

	onMount(() => {
		timeout = setTimeout(worker, interval);
		return () => clearTimeout(timeout);
	});
</script>

<svelte:window onmousemove={binding} onkeydown={binding} />
{@render children?.(Math.max(0, refresh - (Date.now() - time.start)))}
