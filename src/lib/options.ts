export const INPUT_FIELDS = [
	'select:not(:disabled):not([aria-hidden])',
	'textarea:not(:disabled):not([aria-hidden])',
	'input:not(:disabled):not([aria-hidden]):not([type="hidden"])',
] as const;

/** https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex */
export const FOCUSABLE = [
	'embed',
	'iframe',
	'object',
	'a[href]',
	'area[href]',
	'button:not(:disabled):not([aria-hidden])',
	...INPUT_FIELDS,
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])',
] as const;

export const TIME = {
	FADE: 100,
	FLY: 300,
	SLIDE: 300,
} as const;
