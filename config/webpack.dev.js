var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var webpack = require('webpack');

const ENV = process.env.ENV = process.env.NODE_ENV;
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const metadata = webpackMerge(commonConfig.metadata, {
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
                'ENV': JSON.stringify(metadata.ENV.trim()),
                'NODE_ENV': JSON.stringify(metadata.ENV.trim())
            }
        }),
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        proxy: [
            {
                path: '/users',
                target: "http://34.213.112.30:8081",
                changeOrigin: true
            }
        ]
    }
});