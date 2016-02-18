var path = require('path');
var webpack = require('webpack');
var ModuleReplace = webpack.NormalModuleReplacementPlugin;

module.exports = {
    entry: 'app/main.js',
    output: {
        filename: './dist/bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    cacheDirectory: '/tmp/babel',
                },
            }
        ],
    },

    resolve: {
        // The directory (absolute path) that contains your modules
        root: [
            path.resolve('.'),
            path.resolve('./components'),
            path.resolve('./node_modules'),
        ],
    },

    plugins: [
        new ModuleReplace(/^(domReady\!)$/, 'null-module'),
        new ModuleReplace(/^text!.+$/, function(ctx) {
            ctx.request = ctx.request.replace(/text!/, 'raw!');
        }),
        new ModuleReplace(/^css!.+$/, function(ctx) {
            ctx.request = 'style!' + ctx.request;
        }),
    ],
};
