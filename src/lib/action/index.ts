export * as click from './click';

// TODO replace with https://github.com/sveltejs/svelte/pull/7121
interface ActionReturn<Parameter = any> {
	update?: (parameter: Parameter) => void;
	destroy?: () => void;
}
export interface Action<Element = HTMLElement, Parameter = any> {
	<Node extends Element>(node: Node, parameter?: Parameter): void | ActionReturn<Parameter>;
}

/** autofocus element when condition is true */
export const autofocus: Action<HTMLElement, boolean> = (node, when = true) => (
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
		node.style.height = `${memory}px`;
	};

	node.style.setProperty('overflow-y', 'hidden');
	node.style.height = `${memory}px`;
	node.addEventListener('input', receiver);
	return {
		destroy: () => node.removeEventListener('input', receiver),
	};
};
