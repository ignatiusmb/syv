import { writable } from 'svelte/store';

const cache = new Map();

export function fetcher(url: RequestInfo) {
	const store = writable(new Promise(() => {}));
	if (cache.has(url)) store.set(Promise.resolve(cache.get(url)));
	const load = async () => {
		const data = await fetch(url).then((r) => r.json());
		cache.set(url, data), store.set(Promise.resolve(data));
	};
	return load(), store;
}
