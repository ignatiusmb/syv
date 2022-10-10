<script context="module">
	import { writable } from 'svelte/store';
	const time = writable(Date.now());
	const reset = () => time.set(Date.now());
</script>

<script>
	export let idleOnly = false;
	export let refresh = 10 * 60 * 1000;
	export let interval = refresh / 60;
	export let task = noop;

	import { onMount } from 'svelte';
	import { noop } from '../utils';
	const binding = () => idleOnly && reset();

	/** @type {NodeJS.Timeout} */
	let timeout;

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
