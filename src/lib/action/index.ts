export * as click from './click';

// TODO replace with https://github.com/sveltejs/svelte/pull/7121
export interface Action<Parameters = any, Element = HTMLElement> {
	<Node extends Element>(node: Node, parameters?: Parameters): void | {
		update?: (parameters: Parameters) => void;
		destroy?: () => void;
	};
}

export const autofocus: Action<boolean> = (node, when = true) => {
	if (when) node.focus();
	return {
		update: (when) => when && node.focus(),
	};
};
