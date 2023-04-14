import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),

		typescript: {
			config: (settings) => ({ extends: 'mauss/tsconfig.json', ...settings }),
		},
	},
};

export default config;
