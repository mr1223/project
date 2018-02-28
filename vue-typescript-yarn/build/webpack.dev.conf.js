var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.conf');

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
}) 

var webpackConfig = merge(baseWebpackConfig, {
	devServer:{
		historyApiFallback:true,
		hot:true,
		inline:true,
		progress:true,//报错无法识别，删除后也能正常刷新
	},
    plugins: [
    	new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: '"production"'
	      }
	    }),
	    new webpack.HotModuleReplacementPlugin()
    ]
 });
 
 module.exports = webpackConfig
