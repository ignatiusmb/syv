import { onMount } from 'svelte';

type Commands = Record<string, [any, any]>;

type Invoke<T extends Commands> = <C extends keyof T>(
	command: C,
	payload: T[C][0],
) => Promise<T[C][1]>;

export function spawn<T extends Commands>(
	url: string | URL,
	init?: (invoke: Invoke<T>) => void,
): Invoke<T> {
	const pending = new Map<number, { resolve(v: any): void; reject(e: any): void }>();
	let invoke: Invoke<T> = async () => {
		throw new Error('Worker not ready — did you call during SSR?');
	};

	let wid = 0;

	onMount(() => {
		const cog = new Worker(url, { type: 'module' });

		cog.addEventListener('message', ({ data }) => {
			const { id, result, error } = data;
			const task = pending.get(id)!;
			if (!pending.delete(id)) return;
			error ? task.reject(error) : task.resolve(result);
		});

		cog.addEventListener('error', (e) => {
			const path = typeof url === 'string' ? url : url.pathname;
			console.group(`%c[WorkerError] ${path}`, 'color: indianred;');
			console.log(`at ${e.filename}:${e.lineno}:${e.colno}`);
			console.log(e.message);
			e.error ? console.error('Error:', e.error) : console.warn('No error object');
			console.groupEnd();
		});

		invoke = <K extends keyof T>(command: K, payload: T[K][0]) => {
			const id = ++wid;
			return new Promise((resolve, reject) => {
				pending.set(id, { resolve, reject });
				cog.postMessage({ id, command, payload });
			});
		};

		init && init(invoke);
		return () => cog.terminate();
	});

	return (command, payload) => invoke(command, payload);
}
