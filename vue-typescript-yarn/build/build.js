//process.env.NODE_ENV = 'test'
var shell = require('shelljs');
var webpack = require('webpack')
var ora = require('ora')
var path = require('path')
var rm = require('rimraf');
var config = require('../config');
var webpackConfig = require('./webpack.prod.conf');


var spinner = ora('building for production...')
spinner.start()


shell.rm('-rf', path.join(config.build.assetsRoot));
shell.mkdir('-p', path.join(config.build.assetsRoot))

webpack(webpackConfig, function(err, stats) {
	spinner.stop()
  //spinner.stop()
  if (err)
    throw err
  /*process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')*/
//console.log('build completed:' + (parseInt(new Date().getTime()) - startTime))
})
//console.log("测试环境"+process.env.NODE_ENV);
