import { writeFile } from 'fs/promises';
import { icons as feather } from 'feather-icons';

export async function build() {
	const promises = [];
	for (const kebab in feather) {
		promises.push(writeFile(`./feather/${kebab}.js`, feather[kebab]));
	}

	await Promise.all(promises);
}
