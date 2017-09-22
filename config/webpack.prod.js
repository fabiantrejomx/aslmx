var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var DeployToWar = require('webpack-deploy2war');
var CompressionPlugin = require('compression-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV;
const metadata = webpackMerge(commonConfig.metadata, {
  ENV: ENV
});

const path = require('path');
const rootDir = path.resolve(__dirname, '..');
var plugins = [
		new ExtractTextPlugin('style-[contenthash:10].css'),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV.trim()),
                'NODE_ENV': JSON.stringify(metadata.ENV.trim()),
            }
        }),
        new DeployToWar({ fileName: "aslmx.war" }) 
	 ];

module.exports = webpackMerge(commonConfig, {
devtool: 'source-map',
output: {
    path: path.resolve(rootDir, 'dist'),
    publicPath: '',
    filename: 'assets/[name].[hash:12].min.js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: plugins
});