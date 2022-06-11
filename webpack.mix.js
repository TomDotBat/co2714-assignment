const mix = require("laravel-mix");

const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .react()
    .copy("resources/images", "public/images")
    .sourceMaps()
    .version();

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            new ImageminPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i,
                plugins: [
                    imageminMozjpeg({
                        quality: 80,
                    })
                ]
            })
        ]
    });
}
