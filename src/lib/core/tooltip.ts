import type { ComponentProps } from 'svelte';
import type { HTMLAction } from '../action/types';

import { onMount } from 'svelte';
import { FOCUSABLE } from '../options.js';
import Tooltip from './Tooltip.svelte';

const ATTR = 'data-syv:tooltip';
const TIMEOUT = 240;
const OPTIONS: Pick<ComponentProps<Tooltip>, 'class' | 'styles'> = {};

let target: undefined | HTMLElement;
let tooltip: undefined | Tooltip;
let timeout: NodeJS.Timeout;

function scan(anchor: null | EventTarget) {
	const current = anchor as HTMLElement;
	let value = current.getAttribute(ATTR);
	let parent: null | HTMLElement = current;

	while (!value && parent != null && parent !== document.body) {
		value = parent.getAttribute(ATTR);
		if (!value) parent = parent.parentElement;
	}

	const orphan = parent == null || parent === document.body;
	return { data: value || undefined, node: !orphan && parent };
}

function render(props: ComponentProps<Tooltip>) {
	if (tooltip) return tooltip.$set(props);
	tooltip = new Tooltip({ target: document.body, props });
	tooltip.$on('mouseenter', () => clearTimeout(timeout));
	tooltip.$on('mouseleave', () => {
		if (target === document.activeElement) return;
		timeout = setTimeout(dismount, TIMEOUT);
	});
}

const listeners = {
	attach(node: HTMLElement) {
		for (const event of ['focusin', 'focusout'] as const) {
			if (`on${event}` in node) continue;
			node.addEventListener(event, this[event]);
		}
	},

	focusin: (ev: FocusEvent) => mount(ev.target as HTMLElement),
	focusout: () => dismount(),
} as const;

// ---- exposed ----

export function dismount() {
	target = tooltip = void tooltip?.$destroy();
}

export function mount(anchor: HTMLElement, html?: ComponentProps<Tooltip>['html']) {
	const { data = html, node } = scan(anchor);
	if (!data) return; // no `data-syv:tooltip` found

	if (timeout) clearTimeout(timeout);
	listeners.attach((target = node || anchor));
	const rect = target.getBoundingClientRect();
	render({
		html: data,
		x: window.scrollX + (rect.left + rect.right) / 2,
		y: window.scrollY + rect.top,
		class: OPTIONS.class || '',
		styles: OPTIONS.styles || {},
	});
}

export function setup(options: typeof OPTIONS = {}): HTMLAction<any> {
	Object.assign(OPTIONS, options);
	const escaped = ATTR.replace(':', '\\:');
	const elements = FOCUSABLE.map((el) => `${el}[${escaped}]`);

	function enter(event: MouseEvent) {
		const alive = target === document.activeElement;
		if (!alive) mount(event.target as HTMLElement);
	}

	function leave(event: MouseEvent) {
		const alive = target === document.activeElement;
		if (alive || target !== event.target) return;
		target = void (timeout = setTimeout(dismount, TIMEOUT));
	}

	onMount(() => {
		window.addEventListener('mouseover', enter);
		window.addEventListener('mouseout', leave);
		return () => {
			window.removeEventListener('mouseover', enter);
			window.removeEventListener('mouseout', leave);
		};
	});

	return (node) => (listen(node), { update: () => listen(node) });
	function listen(parent: HTMLElement) {
		for (const node of parent.querySelectorAll(elements.join(', '))) {
			listeners.attach(node as HTMLElement);
		}
	}
}

export function shift(props: ComponentProps<Tooltip>) {
	tooltip?.$set(props);
}
