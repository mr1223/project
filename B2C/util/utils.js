var glob = require('glob')
var config = require('../config')
var path = require('path');


/*exports.assetsPath = function(_path) {
  var file = path.posix.join(process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.build.assetsSubDirectoryOfDev, _path)
  //console.log(process.env.NODE_ENV+'file path:' + file);
  return file
}*/

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: sourceLoader,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

/**
 * 入口文件处理方法
 * @param globPath String 路径，支持正则
 * 这里也可以处理任意层级目录，鉴于规范，直接定义成固定层级
 * 返回路径对象
 */
exports.getEntry = function(globPath) {
  var entries = {}
  //var basename
  var tmp = ''
  var tmp1 = ''
  var pathname = ''

	

  glob.sync(globPath).forEach(function(entry) {
  	
  	
  	
    //  basename = path.basename(entry, path.extname(entry))
    //console.log(entry);
    tmp1 = entry.split('/')
    tmp = entry.split('/').splice(-3)
   
    if (tmp1[3] == tmp[0]) {
    	//console.log(exports.ReplaceFirstUper(tmp.splice(0, 1)[0]));
    	/*var dir_arr = [];
    	var dir_test = exports.ReplaceFirstUper(tmp.splice(0, 1)[0]);
    			dir_arr.push(dir_test);
    			console.log(dir_arr);
      pathname = dir_arr + '/' + tmp.splice(0, 1) // 正确输出js和html的路径*/
      pathname = tmp.splice(0, 1) + '/' + tmp.splice(0, 1) // 正确输出js和html的路径
    } else {
    		 ///console.log('111');
      pathname = tmp1[3] + '/' + tmp.splice(0, 1) + '/' + tmp.splice(0, 1) // 正确输出js和html的路径
    	
    }
    /*
     if (tmp1[3] == tmp[0]) {
    		 
      pathname = tmp.splice(0, 1) + '/' + tmp.splice(0, 1) // 正确输出js和html的路径
    } else {
    		 ///console.log('111');
      pathname = tmp1[3] + '/' + tmp.splice(0, 1) + '/' + tmp.splice(0, 1) // 正确输出js和html的路径
    }
     * */
    //  console.log(entry+'basename:' + basename + '\n tmp:' + tmp + '\n tmp1:'+tmp1)

    //  console.log('pathname:'+pathname)
    entries[pathname] = entry
  })
  //处理首页
  
  //return;
  entries['index'] = './src/index.js'
  return entries
}
exports.ReplaceFirstUper = function(str){     
    str = str.toLowerCase();     
    return str.replace(/\b(\w)|\s(\w)/g, function(m){  
        return m.toUpperCase();  
    });    
} 