import { icons as feather } from 'feather-icons';
import { existsSync, readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import prettier from 'prettier';

const pascalCase = (w) => `${w[0].toUpperCase()}${w.slice(1).toLowerCase()}`;
const generate = (icon) => `<script>
	let className = '';
	export { className as class };
	export let size = 24;
	export let weight = 1.5;
	export let color = 'currentColor';
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
			const pascal = kebab.replace(/\w+/g, pascalCase).replace(/-/g, '');
			const formatted = prettier.format(generate(kebab), await config);
			writeFile(`./feather/${pascal}.svelte`, formatted);
			exp += `export { default as ${pascal} } from './${pascal}.svelte';\n`;
		}

		await Promise.all([
			writeFile('./feather/index.js', exp),
			writeFile('./feather/index.d.ts', exp),
		]);
	},
	async config() {
		let path = 'node_modules';
		while (!existsSync(path)) path = `../${path}`;
		const { overrides, ...workspace } = JSON.parse(readFileSync(`${path}/mauss/prettier.json`));
		const { options: svelte } = overrides.find(({ files }) => files[0].endsWith('.svelte'));

		delete workspace['$schema'];
		return { parser: 'svelte', ...workspace, ...svelte };
	},
};
