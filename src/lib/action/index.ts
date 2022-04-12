import type { Action, HTMLAction } from './types';

export * as click from './click';

/** autofocus element when condition is true */
export const autofocus: HTMLAction<boolean> = (node, when = true) => (
	when && node.focus(), { update: (when) => when && node.focus() }
);

/** automatically expand/shrink `textarea` height according to content  */
export const autoresize: Action<HTMLTextAreaElement> = (node) => {
	const { paddingBlock } = getComputedStyle(node);
	const computed = +paddingBlock.slice(0, -2);
	let memory = node.scrollHeight + computed;
	const receiver = () => {
		if (node.scrollHeight <= memory) return;
		memory = node.scrollHeight + computed;
		node.style.setProperty('height', `${memory}px`);
	};

	node.style.setProperty('overflow-y', 'hidden');
	node.style.setProperty('height', `${memory}px`);
	node.addEventListener('input', receiver);
	return {
		destroy: () => node.removeEventListener('input', receiver),
	};
};
