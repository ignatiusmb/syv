import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),

		typescript: {
			config(settings) {
				settings.extends = 'mauss/tsconfig.json';
				return settings;
			},
		},
	},
};

export default config;
