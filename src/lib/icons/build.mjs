import * as fs from 'fs';

for (const filename of fs.readdirSync('./scripts')) {
	// if (fs.existsSync(`./${filename.split('.')[0]}`)) continue;
	(await import(`./scripts/${filename}`)).build();
}
