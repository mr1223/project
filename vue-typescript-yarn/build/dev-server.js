process.env.NODE_ENV = 'production'


var path = require('path');
var webpack = require('webpack');
var express = require('express');
//var WebpackDevServer = require('webpack-dev-server');
var config = require('../config');
var webpackConfig = require('./webpack.dev.conf');




var compiler = webpack(webpackConfig)
var app = new express();
/*var app = new WebpackDevServer(compiler, {
			publicPath: "/dist/",
		});*/

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})
var hotMiddleware = require('webpack-hot-middleware')(compiler)
//var webpackDevServer = require('webpack-dev-server')(compiler);
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})



app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

//app.use(webpackDevServer)
//app.use(compiler);
app.get('/',function(req,res){
	res.send({
		'code': '0'
	})
})
module.exports = app.listen(config.dev.port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + config.dev.port, + '\n')
})