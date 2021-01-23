const feather = require('feather-icons/dist/icons.json');
const { writeFile, writeFileSync } = require('fs');
const { join } = require('path');

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

const pascalCase = (w) => `${w[0].toUpperCase()}${w.slice(1).toLowerCase()}`;
const icons = Object.keys(feather).map((name) => {
	return { original: name, pascal: name.replace(/\w+/g, pascalCase).replace(/-/g, '') };
});

const listComponents = (isDeclaration = false) => {
	const components = icons.map(({ original, pascal }) => {
		if (isDeclaration) return `export class ${pascal} extends BaseIcon {}`;
		writeFile(join(__dirname, `${pascal}.svelte`), generate(original), () => {});
		return `export { default as ${pascal} } from './${pascal}.svelte';`;
	});
	if (isDeclaration)
		components.unshift(
			`import { SvelteComponentTyped } from 'svelte';\nexport class BaseIcon extends SvelteComponentTyped<{\n\tclass?: string;\n\tsize?: number | string;\n\tfloat?: number | string;\n\tcolor?: string;\n}> {}\n`
		);
	return components.join('\n');
};

module.exports = {
	build() {
		writeFileSync(join(__dirname, 'index.js'), listComponents());
		writeFileSync(join(__dirname, 'index.d.ts'), listComponents(true));
	},
};
