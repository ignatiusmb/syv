import type { Action, HTMLAction } from './types.js';
import { clipboard } from 'mauss/web';

/** autofocus element when condition is true */
export const autofocus: HTMLAction<boolean> = (node, when = true) => (
	when && node.focus(), { update: (when) => when && node.focus() }
);

/** automatically expand `textarea` height according to content  */
export const autoresize: Action<HTMLTextAreaElement> = (node) => {
	const { paddingTop: pt, paddingBottom: pb } = getComputedStyle(node);
	const vertical = parseFloat(pt.slice(0, -2)) + parseFloat(pb.slice(0, -2));
	let memory = node.scrollHeight + vertical;
	const receiver = () => {
		if (node.scrollHeight <= memory + vertical) return;
		memory = node.scrollHeight + vertical;
		node.style.setProperty('height', `${memory}px`);
	};

	node.style.setProperty('overflow-y', 'hidden');
	node.style.setProperty('height', `${memory}px`);
	node.addEventListener('input', receiver);
	return {
		destroy: () => node.removeEventListener('input', receiver),
	};
};

export const copy: HTMLAction<{
	data?: string | Blob;
	handler?: Parameters<typeof clipboard.copy>[1];
}> = (node, { data, handler } = {}) => {
	function write() {
		if (!data) return;
		if (typeof data === 'string') clipboard.copy(data, handler);
		else clipboard.copy(clipboard.item(data.type, data), handler);
	}

	node.addEventListener('click', write, true);
	return {
		update({ data: updated = '' }) {
			data = updated;
		},
		destroy() {
			node.removeEventListener('click', write, true);
		},
	};
};

/** determine if click is maintained for `duration` */
export const hold: HTMLAction<{
	/** defaults to `2000` in ms */
	duration?: number;
	/** executed when `duration` has been reached */
	invoke?: () => void;
}> = (node, { duration = 2000, invoke = () => {} } = {}) => {
	let timer: number;

	function press() {
		timer = setTimeout(invoke, duration);
	}
	function release() {
		if (timer) clearTimeout(timer);
	}

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

export const observe: HTMLAction<{
	selector?: string;
	margin?: string;
	threshold?: number | number[];
	intersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}> = (node, { selector = '', ...options } = { intersect: () => {} }) => {
	let targets = selector ? node.querySelectorAll(selector) : [node];
	const observer = new IntersectionObserver(options.intersect, {
		root: node,
		rootMargin: options.margin || '0px',
		threshold: options.threshold || 0,
	});

	return {
		destroy: () => observer.disconnect(),
		update({ selector = '' }) {
			targets.forEach((target) => observer.unobserve(target));
			targets = selector ? node.querySelectorAll(selector) : [node];
			targets.forEach((target) => observer.observe(target));
		},
	};
};

/** determine if there is click event outside of the element */
export const outside: HTMLAction<(event: MouseEvent) => void> = (node, callback) => {
	function clicked(event: MouseEvent) {
		if (!node || !callback || event.defaultPrevented) return;
		if (!node.contains(event.target as Node)) callback(event);
	}

	document.addEventListener('click', clicked, true);
	return {
		destroy() {
			document.removeEventListener('click', clicked, true);
		},
	};
};
