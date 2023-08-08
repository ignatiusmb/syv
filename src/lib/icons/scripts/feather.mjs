import * as fs from 'fs';
import { icons as feather } from 'feather-icons';

export async function build() {
	fs.rmSync('./feather.ts', { force: true });

	let [total, counter] = [0, 0];
	const stream = fs.createWriteStream('./feather.ts');
	stream.write('// @ts-nocheck\n');
	for (const kebab in feather) {
		total += 1;
		const data = JSON.stringify(feather[kebab]);
		const exp = kebab.replace(/(?:^|-)(.)/g, (_, c) => c.toUpperCase());
		stream.write(`export const ${exp} = ${data} as const;\n`);
		counter += 1;
	}
	stream.close();

	console.log(`[syv] generated (${counter} / ${total}) Feather Icons`);
}
