const extend = require('node.extend');
const url = require('url');
const qs = require('qs');


const session = {
	get: key => {
		if(window.sessionStorage){
			return window['sessionStorage'].getItem(key);
		}else{
			console.log("浏览器不支持sessionstorage储存");
			return;
		}
	},
	set: (key,value) =>{
		if(window.sessionStorage){
			if(typeof key == 'object' || typeof key == 'Array' || typeof key == 'function'){
				key = JSON.stringify(key);
			}
			return window['sessionStorage'].setItem(key,value);
		}else{
			console.log("浏览器不支持sessionstorage储存");
			return;
		}
	},
	remove: key =>{
		if(window.sessionStorage){
			return window['sessionStorage'].removeItem(key);
		}else{
			console.log("浏览器不支持sessionstorage储存");
			return;
		}
	},
	clear:() =>{
		if(window.sessionStorage){
			return window['sessionStorage'].clear();
		}else{
			console.log("浏览器不支持sessionstorage储存");
			return;
		}
		
	}
}
const local = {
	get: key =>{
		if(window.localStorage){
			return window['localStorage'].getItem(key);
		}else{
			console.log("浏览器不支持localStorage储存");
			return;
		}
	},
	set: (key,value,exdays) =>{
		if(window.localStorage){
			return window['localStorage'].setItem(key,value);
		}else{
			console.log("浏览器不支持localStorage储存");
			return;
		}
	},
	remove: key =>{
		if(window.localStorage){
			return window['localStorage'].removeItem(key);
		}else{
			console.log("浏览器不支持localStorage储存");
			return;
		}
	},
	clear:() =>{
		if(window.localStorage){
			return window['localStorage'].clear();
		}else{
			console.log("浏览器不支持localStorage储存");
			return;
		}
		
	}
}
const cookie = {
	'get':function(cname){
		 var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
	},
	'set':function(cname, cvalue, exdays,domain,path){
		var d = new Date();
		console.log(d.getTime());
        d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.info(cname + "=" + cvalue + "; " + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : ''));
        document.cookie = cname + "=" + cvalue + "; " + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '');
	},
	'clear':function(cname,domain,path){
		cookie.set(cname, "", -1,domain,path);
	}
}
const wind = {
	'open': function(option){
		var that = {}
		var url_path = '';
			that.option = {
				'url': '',
				'target': '_self',
				'data': {}
			}
		var option = extend(true, {}, that.option,option);
			if(option.url == ''){
				console.log('缺少url参数');
				return;
			}
		var parameter = wind.isEmptyObject(url.parse(option.url, true).query);
			
			if(!parameter){
				//判断url带有参数
				if(!wind.isEmptyObject(option.data)){
					var test_url = '';
					//传进来的参数是否为空数组 不为空数组
					for(var i in option.data){
						test_url += '&' + i + '=' + option.data[i];
					}
					var url_path = option.url + test_url;
				}else{
					var url_path = option.url;
				}
			}else{
				//判断url无参数
				if(!wind.isEmptyObject(option.data)){
					var test_url = '';
					var index = 0;
					for(var i in option.data){
						if(index == 0){
							test_url += '?' + i + '=' + option.data[i];
						}else{
							test_url += '&' + i + '=' + option.data[i];
						}
					}
					var url_path = option.url + test_url;
				}else{
					var url_path = option.url;
				}
			}
			window.open(url_path,option.target);
	},
	'getParam': function(name){
	　　var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	　　var r = window.location.search.substr(1).match(reg);
	　　if (r != null) return decodeURI(r[2]); return null;
	},
	'isEmptyObject': function(e){
		var t;  
	    for (t in e)  
	        return !1;  
	    return !0  
	},
	'detectOS': function(){
		var sUserAgent = navigator.userAgent;
	    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
	    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
	    if (isMac) return "Mac";
	    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
	    if (isUnix) return "Unix";
	    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
	    if (isLinux) return "Linux";
	    if (isWin) {
	        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
	        if (isWin2K) return "Win2000";
	        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
	        if (isWinXP) return "WinXP";
	        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
	        if (isWin2003) return "Win2003";
	        var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
	        if (isWinVista) return "WinVista";
	        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
	        if (isWin7) return "Win7";
	    }
	    return "other";
	},
	'regular': function(ver,reg){
		return reg.test(ver)
	},
	'creatReg': function(Fn,argu){
		var _arr = Fn.length;
		var argu = argu || [];
		
		return function(){
			var _argu = [].slice.call(arguments);
				[].push.apply(_argu,argu);
				_argu.push(argu);
				if(_argu.length < _arr){
					return wind.creatReg.call(this,Fn,_argu);
				}
				
				return Fn.apply(this,_argu);
		}
	},
	'_check': function(arugu){
		return wind.creatReg(wind.regular,arugu);
	},
	'stringify': function(obj){
		return qs.stringify(obj);
	},
}

export default {
	session,
	local,
	cookie,
	wind
}
export {
	session,
	local,
	cookie,
	wind
}
