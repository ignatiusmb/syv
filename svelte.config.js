import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
	},
	package: {
		exports: (filepath) => !filepath.startsWith('.') && !filepath.startsWith('internal/lib'),
		files: (filepath) =>
			!filepath.endsWith('build.mjs') &&
			!filepath.startsWith('.svelte-kit') &&
			filepath !== 'tsconfig.json',
	},
};

export default config;
