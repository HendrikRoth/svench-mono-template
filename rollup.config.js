import * as path from 'path';
import svelte from 'rollup-plugin-svelte-hot';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss-hot';
import { plugin as svench } from 'svench/rollup';

export default () => ({
    input: '.svench/svench.js',
    output: {
        format: 'es',
        dir: 'public'
    },
    plugins: [
        del({
            targets: 'public/svench/*',
            runOnce: true
        }),
        postcss({
            hot: true,
            extract: path.resolve('public/svench/theme.css'),
            sourceMap: true
        }),
        svench({
            dir: 'packages',
            extensions: ['.svench.svelte'],
            serve: {
                host: 'localhost',
                port: 4242,
                public: 'public',
                nollup: 'localhost:42421'
            }
        }),
        svelte({
            dev: true,
            css: css => css.write('public/svench/svench.css'),
            extensions: ['.svelte']
        }),
        resolve({
            browser: true
        })
    ],
    watch: {
        clearScreen: false,
        buildDelay: 100
    }
});