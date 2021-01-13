import { Writable } from 'svelte/store';

export declare function fetcher<T>(url: string): Promise<Writable<T>>;
