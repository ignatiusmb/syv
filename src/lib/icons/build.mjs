import * as fs from 'fs';

fs.readdirSync('./scripts').forEach(async (path) => {
	const script = `./scripts/${path}`;
	if (fs.statSync(script).isDirectory()) return;
	if (fs.existsSync(`./${path.split('.')[0]}`)) return;
	(await import(script)).build();
});
