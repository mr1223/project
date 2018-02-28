var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('../config');
var utils = require('../util/utils');
var baseWebpackConfig = require('./webpack.base.conf');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')



var webpackConfig = merge(baseWebpackConfig, {
    plugins: [
    	new webpack.LoaderOptionsPlugin({  
		   test:/\.vue$/,  
		   options: {  
		       vue: {  
		            loaders: {  
		               css: ExtractTextPlugin.extract({  
		               fallback:'vue-style-loader',   
		               use:'css-loader',  
		               publicPath:"/"  
		             }),  
		           }  
		       }  
		   }  
		}), 
    	new OptimizeCSSPlugin(),
    ]
 });
 
 module.exports = webpackConfig