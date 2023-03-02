import { type ComponentProps, onMount } from 'svelte';
import Tooltip from './Tooltip.svelte';

let tooltip: undefined | Tooltip;

function destroy() {
	tooltip = void (tooltip && tooltip.$destroy());
}

// ---- exposed ----

const ATTR = 'data-syv:tooltip';

interface SetupOptions {
	class?: string;
	styles?: Record<`--${string}`, string | number>;
}
export function setup(options: SetupOptions = {}) {
	let target: null | Element;
	let timeout: NodeJS.Timeout;

	const TIMEOUT = 240;

	function enter(event: MouseEvent) {
		const current = event.target as HTMLElement;
		let data = current.getAttribute(ATTR);
		let parent: null | HTMLElement = current;

		while (!data && parent != null && parent !== document.body) {
			data = parent.getAttribute(ATTR);
			if (!data) parent = parent.parentElement;
		}
		if (!data) return; // no `data-syv:tooltip` found
		if (target === event.target) {
			return tooltip && tooltip.$set({ html: data });
		}

		timeout && clearTimeout(timeout);
		target = parent || current;
		const { top, right, left } = target.getBoundingClientRect();
		const props = {
			html: data,
			x: window.scrollX + (left + right) / 2,
			y: window.scrollY + top,
			class: options.class || '',
			styles: options.styles || {},
		};

		if (tooltip) return tooltip.$set(props);
		tooltip = new Tooltip({ target: document.body, props });
		tooltip.$on('mouseenter', () => clearTimeout(timeout));
		tooltip.$on('mouseleave', () => (timeout = setTimeout(destroy, TIMEOUT)));
	}

	function leave(event: MouseEvent) {
		if (event.target !== target) return;

		target = null;
		timeout = setTimeout(destroy, TIMEOUT);
	}

	onMount(() => {
		window.addEventListener('click', enter);
		window.addEventListener('mouseover', enter);
		window.addEventListener('mouseout', leave);

		return () => {
			window.removeEventListener('click', enter);
			window.removeEventListener('mouseover', enter);
			window.removeEventListener('mouseout', leave);
		};
	});
}

export function shift(props: ComponentProps<Tooltip>) {
	tooltip && tooltip.$set(props);
}
