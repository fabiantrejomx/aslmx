var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var webpack = require('webpack');

const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const metadata = webpackMerge(commonConfig.metadata, {
  host: 'localhost',
  port: 8081,
  ENV: ENV
});

module.exports = webpackMerge(commonConfig, {

    devtool: 'cheap-module-eval-source-map',

    output: {
        path: path.resolve(rootDir, 'dist'),
        publicPath: 'http://localhost:8081/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV),
            }
        }),
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        proxy: [
            {
                path: '/users',
                target: "http://8aaaf691.ngrok.io",
                changeOrigin: true
            }
        ]
    }
});