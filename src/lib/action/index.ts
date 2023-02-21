import type { Action, HTMLAction } from './types.js';

export * as click from './click.js';

/** autofocus element when condition is true */
export const autofocus: HTMLAction<boolean> = (node, when = true) => (
	when && node.focus(), { update: (when) => when && node.focus() }
);

/** automatically expand/shrink `textarea` height according to content  */
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
