import type { Action } from '.';
import { noop } from '../utils';

/** determine if there is click event outside */
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

/** determine if click is maintained for `duration` */
export const hold: Action<{
	/** defaults to `2000` in ms */
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
