var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var webpackMerge = require('webpack-merge');

const path = require('path');
const rootDir = path.resolve(__dirname, '..');

module.exports = {
entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
},

resolve: {
    extensions: ['.js', '.ts', '.html', '.css']
},

module: {
    loaders: [
        {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader']
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file-loader?name=assets/images/[hash].[ext]'
        },
        { 
            test: /\.scss$/, 
            loaders: ['raw-loader', 'sass-loader'] 
        },
        {
            test: /\.css$/,
            loaders: ['to-string-loader', 'css-loader'], 
            exclude: [/node_modules/]
        },
        {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
            include: [/node_modules/]
        }
    ]},
    
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, './src')
        ),
        new webpack.ProvidePlugin({   
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new CopyWebpackPlugin([ 
            { from: 'src/assets/i18n', to: 'assets/i18n' }, 
            { from: 'src/assets/css', to: 'assets/css' },
            { from: 'src/assets/fonts', to: 'assets/fonts' }
            
        ])
    ]
};

function root(__path) {
  return path.join(__dirname, __path);
}
