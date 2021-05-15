const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js').react()
    .postCss('resources/assets/css/app.css', 'public/css')
    .options({
        postCss: [
            require('postcss-import'),
            require('tailwindcss')
        ],
    })
    .extract([
        'axios',
        'moment',
        'numeral',
        'react',
        'react-redux',
        'react-router',
        'react-router-dom',
        'redux',
        'redux-form',
        'redux-thunk'
    ]);

mix.webpackConfig({
    devServer: {
        host: "0.0.0.0",
        port: 8080,
    },
});

if (mix.inProduction()) {
    mix.version();
}
