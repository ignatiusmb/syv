<script context="module">
	import { writable } from 'svelte/store';
	const time = writable(Date.now());
	const reset = () => time.set(Date.now());
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { noop } from '../utils';

	/** "background" ignores `mousemove` and `keydown` events */
	export let runner: 'background' | 'interactive' = 'background';
	export let refresh = 10 * 60 * 1000;
	export let interval = refresh / 60;
	export let task = noop;

	let timeout: NodeJS.Timeout;

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

<svelte:window on:mousemove={binding} on:keydown={binding} />
<slot remaining={Math.max(0, refresh - (Date.now() - $time))} />
