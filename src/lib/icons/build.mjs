import { existsSync } from 'fs';
import feather from './scripts/feather.mjs';

const icons = { feather };

for (const pack of Object.keys(icons)) {
	if (existsSync(`./${pack}/index.js`)) continue;
	icons[pack].build();
}
