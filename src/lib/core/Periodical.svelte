<script context="module">
	import { writable } from 'svelte/store';
	const time = writable(Date.now());
	const reset = () => time.set(Date.now());
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { noop } from '../utils';

	const {
		runner = 'background',
		refresh = 10 * 60 * 1000,
		interval = refresh / 60,
		task = noop,
	} = $props<{
		/** "background" ignores `mousemove` and `keydown` events */
		runner?: 'background' | 'interactive';
		refresh?: number;
		interval?: number;
		task?(): void;
	}>();

	// export let interval = refresh / 60;

	let timeout: number;

	const binding = () => runner === 'interactive' && reset();

	async function worker() {
		const diff = Date.now() - $time;
		if (diff >= refresh) task(), reset();
		timeout = setTimeout(worker, interval);
	}

	onMount(() => {
		timeout = setTimeout(worker, interval);
		return () => clearTimeout(timeout);
	});
</script>

<svelte:window onmousemove={binding} onkeydown={binding} />
<slot remaining={Math.max(0, refresh - (Date.now() - $time))} />
