/** https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex */
export const FOCUSABLE = [
	'embed',
	'iframe',
	'object',
	'a[href]',
	'area[href]',
	'button:not(:disabled):not([aria-hidden])',
	'select:not(:disabled):not([aria-hidden])',
	'textarea:not(:disabled):not([aria-hidden])',
	'input:not(:disabled):not([aria-hidden]):not([type="hidden"])',
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])',
] as const;

export const TIME = {
	FADE: 100,
	FLY: 300,
	SLIDE: 300,
} as const;
