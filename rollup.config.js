import * as path from 'path';
import hmr from 'rollup-plugin-hot'
import svelte from 'rollup-plugin-svelte-hot';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss-hot';
import { plugin as Svench } from 'svench/rollup';

const WATCH = !!process.env.ROLLUP_WATCH
const HOT = WATCH
const PRODUCTION = !WATCH

const svench = Svench({
    dir: 'packages',
    extensions: ['.svench.svelte'],
    extensions: ['.svench', '.svench.svelte', '.svench.svx', '.md'],
    serve: WATCH && {
      host: 'localhost',
      port: 4242,
      public: 'public',
      nollup: 'localhost:42421',
    },
})

export default () => ({
    input: '.svench/svench.js',
    output: {
        format: 'es',
        dir: 'public/svench',
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
        svench,
        svelte({
            dev: !PRODUCTION,
            css: css => css.write('public/svench/svench.css'),
            extensions: ['.svelte', '.svench', '.svx', '.md'],
            // Svench's "combined" preprocessor wraps both Mdsvex preprocessors
            // (configured for Svench), and its own preprocessor (for static
            // analysis -- eg extract source from views)
            preprocess: svench.$.preprocess,
            hot: HOT && {
              optimistic: true,
              noPreserveState: false,
            },
        }),
        resolve({
            browser: true
        }),
        HOT &&
          hmr({
            public: 'public',
            inMemory: true,
            compatModuleHot: !HOT, // for terser
          }),
    ],
    watch: {
        clearScreen: false,
        buildDelay: 100
    }
});
