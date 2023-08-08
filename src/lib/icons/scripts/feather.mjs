import * as fs from 'fs';
import { icons as feather } from 'feather-icons';

export async function build() {
	fs.rmSync('./feather.ts', { force: true });

	let counter = 0;
	const stream = fs.createWriteStream('./feather.ts');
	stream.write('// @ts-nocheck\n');
	for (const kebab in feather) {
		const data = JSON.stringify(feather[kebab]);
		const exp = kebab.replace(/(?:^|-)(.)/g, (_, c) => c.toUpperCase());
		stream.write(`export const ${exp} = ${data} as const;\n`);
		counter += 1;
	}
	stream.close();

	console.log(`[syv] generated 1 file from ${counter} Feather Icons`);
}
