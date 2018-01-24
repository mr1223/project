
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import { Toast } from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'static/css/icon/iconfont.css';
import 'static/css/my-mint.css';
import store from 'common/store';
import {api_classification_first,loginAuth} from 'common/path';
import {classification_first,referer} from 'common/consts';
import {local,session,wind} from 'common/public';

const login = r => require.ensure([], () => r(require('component/login')), 'login');
const goods = r => require.ensure([], () => r(require('view/Goods/index/index')), 'goods');
const goodsList = r => require.ensure([], () => r(require('view/Goods/bizcomponent/goodsList')), 'goodsList');
const goodDetail = r => require.ensure([], () => r(require('view/Goods/bizcomponent/goodDetail')), 'goodDetail');
const goodCar = r => require.ensure([], () => r(require('view/Goods/bizcomponent/goodCar')), 'goodCar');
const shopList = r => require.ensure([], () => r(require('view/Goods/bizcomponent/shopList')), 'shopList');
const goodEvaluate = r => require.ensure([], () => r(require('view/Goods/bizcomponent/goodEvaluate')), 'goodEvaluate');
const goodBuy = r => require.ensure([], () => r(require('view/Goods/bizcomponent/goodBuy')), 'goodBuy');
const goodOrderDetail = r => require.ensure([], () => r(require('view/User/order/orderDetail')), 'goodOrderDetail');
const goodOrderEvaluate = r => require.ensure([], () => r(require('view/User/order/orderEvaluate')), 'goodOrderEvaluate');
const goodOrderRefund = r => require.ensure([], () => r(require('view/User/order/orderRefund')), 'goodOrderRefund');
const goodOrderRefundProce = r => require.ensure([], () => r(require('view/User/order/orderRefundProce')), 'goodOrderRefundProce');
const goodOrderRefundSucc = r => require.ensure([], () => r(require('view/User/order/orderRefundSucc')), 'goodOrderRefundSucc');
const goodOrderPaySucc = r => require.ensure([], () => r(require('view/User/order/orderPaySucc')), 'goodOrderPaySucc');

const orderExplain = r => require.ensure([], () => r(require('view/User/order/orderExplain')), 'orderExplain');

const userFeedback = r => require.ensure([], () => r(require('view/User/usercomponent/userFeedback')), 'userFeedback');



import index from 'view/Index/index/index';
//const index = r => require.ensure([], () => r(require('view/Index/index/index')), 'index');
const searchResult = r => require.ensure([], () => r(require('view/Index/indexcomponent/searchResult')), 'searchResult');
const user = r => require.ensure([], () => r(require('view/User/index/index')), 'user');
const businessQualification = r => require.ensure([], () => r(require('view/User/bizcomponent/businessQualification')), 'businessQualification');
const busiImage = r => require.ensure([], () => r(require('view/User/bizcomponent/busiImage')), 'busiImage');
const addressMange = r => require.ensure([], () => r(require('view/User/bizcomponent/addressMange')), 'addressMange');
const addAddress = r => require.ensure([], () => r(require('view/User/bizcomponent/addAddress')), 'addAddress');
const order = r => require.ensure([], () => r(require('view/User/order/index')), 'order');
const ErrorAuth = r => require.ensure([], () => r(require('view/Error/index/auth')), 'ErrorAuth');
const ErrorTest = r => require.ensure([], () => r(require('view/Error/index/test')), 'ErrorTest');
const ErrorRadio = r => require.ensure([], () => r(require('view/Error/index/radio')), 'ErrorRadio');




/*import login from 'component/login';
import goods from 'view/Goods/index/index';
import goodsList from 'view/Goods/bizcomponent/goodsList';
import goodDetail from 'view/Goods/bizcomponent/goodDetail';
import goodCar from 'view/Goods/bizcomponent/goodCar';
import shopList from 'view/Goods/bizcomponent/shopList';
import index from 'view/Index/index/index';
import user from 'view/User/index/index';
import businessQualification from 'view/User/bizcomponent/businessQualification';
import addressMange from 'view/User/bizcomponent/addressMange';
import addAddress from 'view/User/bizcomponent/addAddress';
import ErrorAuth from 'view/Error/index/auth';*/




Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.config.debug = true;//开启错误提示


//router 配置
const routes = [
	{ 
		path: '/', 
		component: index,
		meta: { 
			title: "首页",
			navIndex: 1,
			AuthStatus: true
		},
	},
	{ 
		name: 'searchResult',
		path: '/searchResult', 
		component: searchResult,
		meta: { 
			title: "搜索结果",
			navIndex: 1,
			AuthStatus: true
		},
	},
	{ 
		path: '/ErrorAuth', 
		component: ErrorAuth,
		meta: { 
			title: "授权认证",
			AuthStatus: true
		},
	},
	{ 
		path: '/ErrorTest', 
		component: ErrorTest,
		meta: { 
			title: "测试",
			AuthStatus: true
		},
	},
	{ 
		path: '/ErrorRadio', 
		component: ErrorRadio,
		meta: { 
			title: "radio",
			AuthStatus: true
		},
	},
  	{ 
  		path: '/login', 
  		component: login ,
  		meta: { 
  			title: "登录" ,
  			AuthStatus: true
  		},
  	},
  	{ 
  		path: '/goods/:id',
  		name: 'goods', 
  		component: goods ,
  		meta: { 
  			title: "商品",
  			AuthStatus: true
  		},
  	},
  	{ 
  		path: '/goodsList/:id/:uid',
  		name: 'goodsList', 
  		component: goodsList ,
  		meta: { 
  			title: "分类商品列表"
  			},
  	},
  	{ 
  		path: '/goodDetail/:id',
  		name: 'goodDetail', 
  		component: goodDetail ,
  		meta: { 
  			title: "商品详情",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/goodCar',
  		name: 'goodCar', 
  		component: goodCar ,
  		meta: { 
  			title: "购物车",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/shopList',
  		name: 'shopList', 
  		component: shopList ,
  		meta: { 
  			title: "常用清单",
  			navIndex: 2,
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/goodEvaluate/:id',
  		name: 'goodEvaluate', 
  		component: goodEvaluate ,
  		meta: { 
  			title: "用户评价",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/goodBuy/:id',
  		name: 'goodBuy', 
  		component: goodBuy ,
  		meta: { 
  			title: "立即购买",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/goodOrderDetail/:id',
  		name: 'goodOrderDetail', 
  		component: goodOrderDetail ,
  		meta: { 
  			title: "订单详情",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/goodOrderEvaluate/:id',
  		name: 'goodOrderEvaluate', 
  		component: goodOrderEvaluate ,
  		meta: { 
  			title: "立即评价",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/goodOrderRefund/:id',
  		name: 'goodOrderRefund', 
  		component: goodOrderRefund ,
  		meta: { 
  			title: "申请退款",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/goodOrderRefundProce/:id',
  		name: 'goodOrderRefundProce', 
  		component: goodOrderRefundProce ,
  		meta: { 
  			title: "退款处理",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/goodOrderRefundSucc/:id',
  		name: 'goodOrderRefundSucc', 
  		component: goodOrderRefundSucc ,
  		meta: { 
  			title: "退款详情",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/goodOrderPaySucc/:id',
  		name: 'goodOrderPaySucc', 
  		component: goodOrderPaySucc ,
  		meta: { 
  			title: "退款成功",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/orderExplain/:id',
  		name: 'orderExplain', 
  		component: orderExplain ,
  		meta: { 
  			title: "退款说明",
  			AuthStatus: true,
  		},
  	},
  	{ 
  		path: '/user',
  		name: 'user', 
  		component: user ,
  		meta: { 
  			title: "我的",
  			navIndex: 3,
  			AuthStatus: true
  		},
  	},
  	{ 
  		path: '/businessQualification',
  		name: 'businessQualification', 
  		component: businessQualification ,
  		meta: { 
  			title: "营业资质",
  			AuthStatus: true
  		},
  	},
  		{ 
  		path: '/busiImage',
  		name: 'busiImage', 
  		component: busiImage ,
  		meta: { 
  			title: "营业资质",
  			AuthStatus: true
  		},
  	},
  	{ 
  		path: '/userFeedback',
  		name: 'userFeedback', 
  		component: userFeedback ,
  		meta: { 
  			title: "意见反馈",
  			AuthStatus: true
  		},
  	},
  	{ 
  		path: '/addressMange',
  		name: 'addressMange', 
  		component: addressMange ,
  		meta: { 
  			title: "地址管理",
  			AuthStatus: true
  		},
  	},
  	{ 
  		path: '/addAddress/:id',
  		name: 'addAddress', 
  		component: addAddress ,
  		meta: { 
  			title: "地址",
  			AuthStatus: true
  		},
  	},
  	{ 
  		path: '/order/:id',
  		name: 'order', 
  		component: order ,
  		meta: { 
  			title: "订单中心",
  			AuthStatus: true
  		},
  	},
  	
  	
]



const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})


//标题设置   页面登录拦截
router.beforeEach((to, from, next) => {
  	if (to.meta.title) {//如果设置标题，拦截后设置标题
    	document.title = to.meta.title
  	}
  	if(to.name == 'addAddress'){
  		const id = to.params.id;
  		if(id == -1){
  			document.title = '新增地址';
  		}else{
  			document.title = '编辑地址';
  		}
  	}
  	if(to.name == 'goods'){
  		const id = to.params.id;
  		store.commit('INCREMENT', {
		  	classification_first_status: id
		})
  	}
  	if(to.name == 'order'){
  		const id = to.params.id;
  		store.commit('INCREMENT', {
		  	order: id
		})
  	}
	//微信认证拦截
	if(!store.state.WXTOKEN){
		if(to.meta.navIndex){
			if(store.state.navStatus){
				local.set(referer,to.meta.navIndex);
				axios.post(loginAuth,{
				    params: {
				      	
				    }
				})
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		//wind.open(data.url);
			    		window.location.href = data.url;
			    	}
			    	
			  	})
			  	.catch(function (error) {
			  		
				});
			}
		  	
		}
		
		/*next({
            path: '/ErrorAuth',
            query: {redirect: to.fullPath}
        })*/
	}
  		//登录拦截
  	if(!store.state.BASE_INFO) {
  		if(!to.meta.AuthStatus){
  			next({
	            path: '/login',
	            query: {redirect: to.fullPath}
	        })
  		}
  	}
  
  
  next()
})
//http请求拦截
// http request 拦截器
axios.interceptors.request.use(
config => {
    if (store.state.BASE_INFO) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `token ${store.state.BASE_INFO}`;
    }
    return config;
},
err => {
    return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(
response => {
	if (response.data) {
        switch (response.data.success) {
            case 4000:
                store.commit('INCREMENT', {
				  	BASE_INFO: ''
				})
                router.push({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                })
           	break;
           	case 3000:
            	//Toast(response.data.msg);
            break;
            case 2000:
            	Toast(response.data.msg);
            	console.log(response.data.msg);
            break;
        }
    }
    return response;
},
error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
            	console.log('BASE_INFO失效');
                // 返回 401 清除BASE_INFO信息并跳转到登录页面
                store.commit('INCREMENT', {
				  	BASE_INFO: ''
				})
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

if(store.state.classification_first.length == 0){
	const _that = this;
	axios.post(api_classification_first)
	.then(function (response) {
		const data = response.data;
		if(data.success == 1000){
			const GoodClassification = data.GoodClassification;
			store.dispatch('increment',{
				'classification_first': GoodClassification
			});
			
			session.set(classification_first,JSON.stringify(GoodClassification));
		}
		
	})
	.catch(function (error) {
		console.log(error);
	});
}











module.exports = router;


