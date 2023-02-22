import * as fs from 'fs';

fs.readdirSync('./scripts').forEach(async (path) => {
	const script = `./scripts/${path}`;
	if (fs.statSync(script).isDirectory()) return;
	if (fs.readdirSync(`./${path}`).length) return;
	(await import(script)).build();
});
