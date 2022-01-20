import type { Action } from '.';
import { noop } from '../utils';

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

export const hold: Action<{
	duration?: number;
	/** executed when `duration` has been reached */
	invoke?: () => void;
}> = (node, { duration = 2000, invoke = noop } = {}) => {
	let timer: NodeJS.Timeout;

	const press = () => {
		timer = setTimeout(invoke, duration);
	};
	const release = () => {
		if (timer) clearTimeout(timer);
	};

	node.addEventListener('mousedown', press);
	node.addEventListener('mouseup', release);
	return {
		update({ duration: updated = 2000 }) {
			duration = updated;
		},
		destroy() {
			node.removeEventListener('mousedown', press);
			node.removeEventListener('mouseup', release);
		},
	};
};
