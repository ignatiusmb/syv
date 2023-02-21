import * as fs from 'fs';

fs.readdirSync('.').forEach(async (path) => {
	if (!fs.statSync(path).isDirectory()) return;
	if (fs.existsSync(`./${path}/index.js`)) return;
	const { build } = await import(`./${path}/build.mjs`);
	build();
});
