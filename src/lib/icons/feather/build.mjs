import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';

import { icons as feather } from 'feather-icons';
import { capitalize } from 'mauss/utils';
import commands from 'mauss/prettier.json' assert { type: 'json' };
import prettier from 'prettier';

/** @param {string} icon */
const generate = (icon) => `<script>
	export let size = 24;
	export let weight = 1.5;
	export let color = 'currentColor';
	export { className as class };
	let className = '';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	fill="none"
	viewBox="0 0 24 24"
	stroke={color}
	stroke-width={weight}
	stroke-linecap="round"
	stroke-linejoin="round"
	class="syv-icons-feather-${icon} {className}"
	on:click
>
	${feather[icon].contents}
</svg>
`;

export default {
	async build() {
		const config = this.config();

		let exp = '';
		for (const kebab in feather) {
			const pascal = kebab.replace(/\w+/g, capitalize).replace(/-/g, '');
			const formatted = prettier.format(generate(kebab), config);
			writeFile(`./feather/${pascal}.svelte`, formatted);
			exp += `export { default as ${pascal} } from './${pascal}.svelte';\n`;
		}

		await Promise.all([
			writeFile('./feather/index.js', exp),
			writeFile('./feather/index.d.ts', exp),
		]);
	},
	config() {
		let path = 'node_modules';
		while (!existsSync(path)) path = `../${path}`;
		const { overrides, ...workspace } = commands;
		const { options: svelte } = /** @type {{ options: any }} */ (
			overrides.find((/** @type {{ files: string[] }} */ options) =>
				options.files[0].endsWith('.svelte')
			)
		);

		delete workspace['$schema'];
		svelte['parser'] = 'svelte';
		svelte['plugins'] = ['prettier-plugin-svelte'];
		return { ...workspace, ...svelte };
	},
};
