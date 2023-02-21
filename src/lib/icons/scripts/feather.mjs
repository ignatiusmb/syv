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

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
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
	on:click={() => dispatch('press')}
	on:keyup={(ev) => (ev.key === ' ' || ev.key === 'Enter') && dispatch('press')}
>
	${feather[icon].contents}
</svg>
`;

export async function build() {
	let exp = '';

	const promises = [];
	for (const kebab in feather) {
		const pascal = kebab.replace(/\w+/g, capitalize).replace(/-/g, '');
		promises.push(writeFile(`./feather/${pascal}.svelte`, generate(kebab)));
		exp += `export { default as ${pascal} } from './${pascal}.svelte';\n`;
	}

	promises.push(writeFile('./feather/index.js', exp));
	promises.push(writeFile('./feather/index.d.ts', exp));
	await Promise.all(promises);
}
