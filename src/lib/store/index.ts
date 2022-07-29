import { onMount } from 'svelte';
import * as api from './api';
import * as browser from './browser';

export { api, browser };

export const mounted = {
	subscribe(fn: (state: boolean) => void) {
		fn(false);
		onMount(() => fn(true));
		return () => {};
	},
};
