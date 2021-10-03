import sveltePreprocess from 'svelte-preprocess';
plugins: [
    svelte({
        ...,
        preprocess: sveltePreprocess()
    }),
]