/** @type {import('@sveltejs/kit').Config} */
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess.js';
import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			pages: "public",
			assets: "public",
			fallback: null
		})
	},
	preprocess: sveltePreprocess(),
};

export default config;
