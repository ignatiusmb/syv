import { onMount } from 'svelte';
import * as api from './api.js';
import * as browser from './browser.js';

export { api, browser };

export const mounted = {
	subscribe(fn: (state: boolean) => void) {
		fn(false);
		onMount(() => fn(true));
		return () => {};
	},
};
