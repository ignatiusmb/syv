import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
	},
	package: {
		exports(filepath) {
			if (filepath.startsWith('.')) return false; // dotfiles are private
			if (filepath.endsWith('.d.ts')) return false; // handwritten types
			if (filepath.includes('/lib/')) return false; // internal components
			if (filepath.startsWith('icons/')) return !filepath.endsWith('.svelte');
			return true;
		},
		files(filepath) {
			if (filepath.endsWith('build.mjs')) return false; // build script
			return filepath !== 'tsconfig.json';
		},
	},
};

export default config;
