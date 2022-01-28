export * as click from './click';

// TODO replace with https://github.com/sveltejs/svelte/pull/7121
interface ActionReturn<Parameters = any> {
	update?: (parameters: Parameters) => void;
	destroy?: () => void;
}
export interface Action<Parameters = any, Element = HTMLElement> {
	<Node extends Element>(node: Node, parameters?: Parameters): void | ActionReturn<Parameters>;
}

/** autofocus element when condition is true */
export const autofocus: Action<boolean> = (node, when = true) => (
	when && node.focus(), { update: (when) => when && node.focus() }
);

export const autoresize: Action = (node) => {
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
