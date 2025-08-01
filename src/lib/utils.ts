export function weave(styles: Record<string, false | string | number>): string {
	let inline = '';
	for (const key in styles) {
		if (typeof styles[key] !== 'number' && !styles[key]) continue;
		inline += `${key.replace(/:/g, '-')}:${styles[key]};`;
	}
	return inline;
}
