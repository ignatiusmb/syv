import type { Action } from '.';

export const outside: Action<(event: MouseEvent) => void> = (node, callback) => {
	const clicked = (event: MouseEvent) => {
		if (!node || !callback || event.defaultPrevented) return;
		if (!node.contains(event.target as Node)) callback(event);
	};

	document.addEventListener('click', clicked, true);
	return {
		destroy: () => document.removeEventListener('click', clicked, true),
	};
};
