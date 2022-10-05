import { writeFile } from 'fs/promises';
import { icons as feather } from 'feather-icons';
import { capitalize } from 'mauss/utils';

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

export async function build() {
	let exp = '';
	for (const kebab in feather) {
		const pascal = kebab.replace(/\w+/g, capitalize).replace(/-/g, '');
		writeFile(`./feather/${pascal}.svelte`, generate(kebab));
		exp += `export { default as ${pascal} } from './${pascal}.svelte';\n`;
	}

	await Promise.all([writeFile('./feather/index.js', exp), writeFile('./feather/index.d.ts', exp)]);
}
