import * as fs from 'fs';

export async function build() {
	fs.rmSync('./fluent', { force: true, recursive: true });
	fs.mkdirSync('./fluent');

	const node_modules = '../../../node_modules';
	const source = `${node_modules}/@fluentui/svg-icons/icons`;
	let [total, counter] = [0, 0];
	for (const pathname of fs.readdirSync(source)) {
		const filepath = `${source}/${pathname}`;
		if (fs.statSync(filepath).isDirectory()) return;

		total += 1;
		const svg = fs.readFileSync(filepath, 'utf-8');
		const [, , contents] = /<svg (.*?)>(.*)<\/svg>/.exec(svg);
		const [type, size, ...name] = pathname.split('_').reverse();

		const filename = `./fluent/${name.reverse().join('-')}.ts`;
		const module = `${type[0].toUpperCase()}${size}`;
		const json = JSON.stringify({ size, contents });
		const data = `export const ${module} = ${json};`;
		if (fs.existsSync(filename)) {
			fs.appendFileSync(filename, data + '\n');
		} else {
			fs.writeFileSync(filename, `// @ts-nocheck\n${data}\n`);
			counter += 1;
		}
	}

	console.log(`[syv] generated (${counter} / ${total}) Fluent Icons`);
}
