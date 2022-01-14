export * as click from './click';

export interface Action<Parameters = any, Element = HTMLElement> {
	<Node extends Element>(node: Node, parameters?: Parameters): void | {
		update?: (parameters: Parameters) => void;
		destroy?: () => void;
	};
}
