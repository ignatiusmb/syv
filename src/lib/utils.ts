export function weave(styles: Record<string, string | number>): string {
	return Object.entries(styles).reduce((s, [p, v]) => {
		return `${s}${p.replace(/:/g, '-')}:${v};`;
	}, '');
}
