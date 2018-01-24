var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('../config');
var utils = require('../util/utils');

var entries = utils.getEntry('./src/view/**/*.js') // 获得入口js文件
var chunks = Object.keys(entries)



		process.env.NODE_ENV == 'development' ? accpoot = config.dev.assetsSubDirectory : accpoot = config.build.assetsSubDirectory ;
		process.env.NODE_ENV == 'development' ? assetsPublicPath = config.dev.assetsPublicPath : assetsPublicPath = config.build.assetsPublicPath ;



module.exports = {
  entry: entries,
  output: {
  	filename: accpoot + '/js/[name][hash].js',
    path: config.root.assetsRoot,
    publicPath: assetsPublicPath,
    chunkFilename: accpoot + '/js/[name][hash].js',
  },
  resolve: {
    // 别名配置
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'view': path.resolve(__dirname, '../src/view'),
      'common': path.resolve(__dirname, '../src/common'),
      'component': path.resolve(__dirname, '../src/component'),
      'BaseCharts': path.resolve(__dirname, '../src/BaseCharts'),
      'examples': path.resolve(__dirname, '../src/examples'),
      'helpers': path.resolve(__dirname, '../src/helpers'),
      'static': path.resolve(__dirname, '../src/static'),
      'vue': 'vue/dist/vue.js',
      'bootstrap': path.resolve(__dirname, '../node_modules/bootstrap/dist'),
    },
    extensions: [" ", ".js", ".vue"]
  },
  module: {
    rules: [
    	{
	        test: /\.vue$/,
	        use: [
		    	{
		    		loader: "vue-loader"
		    	}
		    ],
	    },
	    { 	test: /iview.src.*?js$/, 
	    	loader: 'babel' 
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
          	test: /\.css$/,
	        loader: ExtractTextPlugin.extract({
		        fallbackLoader: "style-loader",
		        loader: "css-loader",
		        publicPath: "/"
		    })
        },
		{
		    test: /\.sass$/,
		    loaders: ["style", "css", "sass"]
		},
	    {
	　　　　　　test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	　　　　　　use: [
				{
					loader: 'url-loader',
					query: {
			            limit: 8192,
			            name: accpoot + '/img/[name].[hash:7].[ext]'
			        }
				}
			],
	        exclude: /node_modules/
	　　　},
		{
	        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	        loader:"file-loader",
	        options: {
	          name: accpoot + '/fonts/[name].[hash].[ext]'
	        }
      	}
    ]
  },
  plugins:[
  	
  	new webpack.optimize.CommonsChunkPlugin({
  		name: 'vendors', // 公共模块的名称
	   // chunks: chunks,   chunks是需要提取的模块
	    minChunks: ({resource}) => (
	    	resource && resource.indexOf('node_modules') >=0 && resource.match(/.js$/)
	    )
  	}),
  	new webpack.optimize.CommonsChunkPlugin({
  		name: 'common', // 公共模块的名称
	    //chunks: chunks,   chunks是需要提取的模块
	    minChunks: 2, //js文件被每一个页面引用才提取出来  chunks.length
  	}),
  	new ExtractTextPlugin({
  		filename: config.build.assetsSubDirectory + '/css/[name].css'
	}),
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
    conf.chunks = ['common','vendors', pathname]
    conf.hash = false
  }
  //首页
  if('index'===pathname){
    conf.template = './src/index.html'
  }

  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}
