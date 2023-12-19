import type { Action, ActionReturn } from 'svelte/action';

export type { Action, ActionReturn as Returned };
export interface HTMLAction<T> extends Action<HTMLElement, T> {}
