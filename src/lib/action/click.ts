export function outside(node: HTMLElement, callback: (event: MouseEvent) => void) {
	const clicked = (event: MouseEvent) => {
		if (!node || event.defaultPrevented) return;
		if (!node.contains(event.target as Node)) callback(event);
	};

	document.addEventListener('click', clicked, true);
	return {
		destroy: () => document.removeEventListener('click', clicked, true),
	};
}
