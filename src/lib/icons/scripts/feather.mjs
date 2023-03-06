import * as fs from 'fs';
import { icons as feather } from 'feather-icons';

export async function build() {
	fs.rmSync('./feather', { force: true, recursive: true });
	fs.mkdirSync('./feather');

	let [total, counter] = [0, 0];
	for (const kebab in feather) {
		total += 1;
		let data = '// @ts-nocheck\n';
		for (const [k, v] of Object.entries(feather[kebab])) {
			data += `export const ${k} = ${JSON.stringify(v)} as const;\n`;
		}
		counter += +!fs.writeFileSync(`./feather/${kebab}.ts`, data);
	}

	console.log(`[syv] generated (${counter} / ${total}) Feather Icons`);
}
