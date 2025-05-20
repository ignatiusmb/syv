import type { Attachment } from 'svelte/attachments';
import { clipboard } from 'mauss/web';

/** autofocus element when condition is true */
export const autofocus: (when: boolean) => Attachment = (when = true) => {
	return (node) => void (when && node instanceof HTMLElement && node.focus());
};

/** automatically expand `textarea` height according to content  */
export const autoresize: Attachment = (element) => {
	if (element.tagName !== 'TEXTAREA') return;
	const node = element as HTMLTextAreaElement;

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
	return () => node.removeEventListener('input', receiver);
};

export const copy: (opts: {
	data?: string | Blob;
	handler?: Parameters<typeof clipboard.copy>[1];
}) => Attachment = ({ data, handler }) => {
	function write() {
		if (!data) return;
		if (typeof data === 'string') clipboard.copy(data, handler);
		else clipboard.copy(clipboard.item(data.type, data), handler);
	}

	return (node) => {
		node.addEventListener('click', write, true);
		return () => node.removeEventListener('click', write, true);
	};
};

/** determine if click is maintained for `duration` */
export const hold: (opts: {
	/** defaults to `2000` in ms */
	duration?: number;
	/** executed when `duration` has been reached */
	invoke?: () => void;
}) => Attachment = ({ duration = 2000, invoke = () => {} } = {}) => {
	let timer: number;

	function press() {
		timer = setTimeout(invoke, duration);
	}
	function release() {
		if (timer) clearTimeout(timer);
	}

	return (node) => {
		node.addEventListener('mousedown', press);
		node.addEventListener('mouseup', release);
		return () => {
			node.removeEventListener('mousedown', press);
			node.removeEventListener('mouseup', release);
		};
	};
};

export const observe: (opts: {
	selector?: string;
	margin?: string;
	threshold?: number | number[];
	intersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}) => Attachment = ({ selector = '', ...options }) => {
	return (node) => {
		let targets = selector ? node.querySelectorAll(selector) : [node];
		const observer = new IntersectionObserver(options.intersect, {
			root: node,
			rootMargin: options.margin || '0px',
			threshold: options.threshold || 0,
		});

		$effect(() => {
			targets.forEach((target) => observer.unobserve(target));
			targets = selector ? node.querySelectorAll(selector) : [node];
			targets.forEach((target) => observer.observe(target));
		});

		return () => observer.disconnect();
	};
};

/** determine if there is click event outside of the element */
export const outside: (callback: (event: MouseEvent) => void) => Attachment = (callback) => {
	return (node) => {
		function clicked(event: MouseEvent) {
			if (!node || !callback || event.defaultPrevented) return;
			if (!node.contains(event.target as Node)) callback(event);
		}

		document.addEventListener('click', clicked, true);
		return () => document.removeEventListener('click', clicked, true);
	};
};
