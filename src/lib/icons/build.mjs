import * as fs from 'fs';

fs.readdirSync('./scripts').forEach(async (path) => {
	if (!fs.statSync(`./scripts/${path}`).isDirectory()) return;
	if (fs.existsSync(`./${path}/index.js`)) return;
	(await import(`./scripts/${path}`)).build();
});
