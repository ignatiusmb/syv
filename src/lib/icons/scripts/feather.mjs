import * as fsp from 'fs/promises';
import { icons as feather } from 'feather-icons';

export async function build() {
	await fsp.rm('./feather', { force: true, recursive: true });
	await fsp.mkdir('./feather');

	const promises = [];
	for (const kebab in feather) {
		let data = '// @ts-nocheck\n';
		for (const [k, v] of Object.entries(feather[kebab])) {
			data += `export const ${k} = ${JSON.stringify(v)} as const;\n`;
		}
		promises.push(fsp.writeFile(`./feather/${kebab}.ts`, data));
	}

	await Promise.all(promises);
}
