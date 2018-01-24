var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var utils = require('../util/utils');

var entries = utils.getEntry('./src/view/**/*.js') // 获得入口js文件
var chunks = Object.keys(entries)




module.exports = {
  entry: entries,
  output: {
  	filename: 'static/js/[name][hash].js',
    path:  path.resolve(__dirname, '../dist'),
    publicPath: '/',
    chunkFilename: 'static/js/[id].js',
  },
  resolve: {
    // 别名配置
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      'component': path.resolve(__dirname, '../src/component'),
      'static': path.resolve(__dirname, '../src/static'),
      'vue': 'vue/dist/vue.js'  
    }
  },
  module: {
    loaders: [
    	{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query:{
        	presets: ['es2015','stage-0']
        }
      },
      {
        test: /\.less|css$/,
        loader: 'style!css!less',
        exclude: /node_modules/
      }
    ]
  },
  plugins:[
  	new webpack.optimize.CommonsChunkPlugin({
  		name: 'vendors', // 公共模块的名称
      chunks: chunks,  // chunks是需要提取的模块
      minChunks: chunks.length //js文件被每一个页面引用才提取出来
  	})
  ]
}
var pages = utils.getEntry('./src/view/**/*.html')
//var prod = process.env.NODE_ENV === config.build.env
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    inject: true,              // js插入位置
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  };
  if (pathname in module.exports.entry) {
    conf.chunks = ['vendors', pathname]
    conf.hash = false
  }
  //首页
  if('index'===pathname){
    conf.template = './src/index.html'
  }

  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}
