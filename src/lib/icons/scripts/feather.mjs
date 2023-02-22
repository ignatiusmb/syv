import { mkdir, rm, writeFile } from 'fs/promises';
import { icons as feather } from 'feather-icons';

export async function build() {
	await rm('./feather', { force: true, recursive: true });
	await mkdir('./feather');
	const promises = [];
	for (const kebab in feather) {
		let data = '';
		for (const [k, v] of Object.entries(feather[kebab])) {
			data += `export const ${k} = ${JSON.stringify(v)};\n`;
		}
		promises.push(writeFile(`./feather/${kebab}.js`, data));
	}

	await Promise.all(promises);
}
