import * as fs from 'fs';

for (const filename of fs.readdirSync('./scripts')) {
	// if (fs.existsSync(`./${filename.split('.')[0]}`)) continue;
	if (filename === 'fluent.mjs') continue;
	(await import(`./scripts/${filename}`)).build();
}
