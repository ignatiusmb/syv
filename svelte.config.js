import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		package: {
			exports: (filepath) => {
				if (filepath.startsWith('.')) return false;
				return !filepath.startsWith('internal/lib');
			},
			files: (filepath) => !filepath.endsWith('build.mjs'),
		},
	},
};

export default config;
