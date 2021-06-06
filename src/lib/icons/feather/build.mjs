import { readFileSync, writeFileSync } from 'fs';
import { writeFile } from 'fs/promises';

const feather = JSON.parse(readFileSync('node_modules/feather-icons/dist/icons.json', 'utf-8'));
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
	class="lmns lmns-icons feather-${icon} {className}">
	${feather[icon]}
</svg>
`;

export default {
	build() {
		const base = './src/icons/feather';
		let idx = '';
		let dts = `import { SvelteComponentTyped } from 'svelte';\nexport class BaseIcon extends SvelteComponentTyped<{\n\tclass?: string;\n\tsize?: number | string;\n\tfloat?: number | string;\n\tcolor?: string;\n}> {}\n`;
		for (const kebab in feather) {
			const pascal = kebab.replace(/\w+/g, pascalCase).replace(/-/g, '');
			writeFile(`${base}/${pascal}.svelte`, generate(kebab));
			idx += `export { default as ${pascal} } from './${pascal}.svelte';\n`;
			dts += `export class ${pascal} extends BaseIcon {}\n`;
		}
		writeFileSync(`${base}/index.js`, idx);
		writeFileSync(`${base}/index.d.ts`, dts);
	},
};
