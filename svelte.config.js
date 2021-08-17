import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		target: '#svelte',
		package: {
			emitTypes: false,
			files: { exclude: ['**/build.mjs'] },
		},
		vite: {
			optimizeDeps: {
				exclude: ['marqua'],
				include: ['markdown-it'],
			},
			ssr: {
				noExternal: ['mauss', 'marqua'],
			},
		},
	},
};

export default config;
