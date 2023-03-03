export const noop = () => {};

export function weave(styles: Record<string, string | number>): string {
	return Object.entries(styles).reduce((s, [p, v]) => `${s}${p}:${v};`, '');
}
