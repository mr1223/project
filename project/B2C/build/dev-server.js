process.env.NODE_ENV = 'development'


const path = require('path');
const webpack = require('webpack');
const express = require('express');
const proxyMiddleware = require('http-proxy-middleware')
//const WebpackDevServer = require('webpack-dev-server');
const config = require('../config');
const webpackConfig = require('./webpack.dev.conf');

const proxyTable = config.dev.proxyTable


const compiler = webpack(webpackConfig)
const app = new express();
/*const app = new WebpackDevServer(compiler, {
			publicPath: "/dist/",
		});*/

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})
const hotMiddleware = require('webpack-hot-middleware')(compiler)
//const webpackDevServer = require('webpack-dev-server')(compiler);
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

Object.keys(proxyTable).forEach(function (context) {
  const options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
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