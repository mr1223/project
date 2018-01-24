


import Vue from 'vue';
import vuex from 'vuex';
import {getGoodClassification} from 'common/action';
import {local,cookie,session} from 'common/public';
import {addressInfo} from 'common/consts';
import {WXTOKEN,BASE_INFO,WECHAT_INFO,classification_first,referer,SHOPCARBUY,SHOPCARBUYADDRESS,SHOPCARTYPE} from 'common/consts';

Vue.use(vuex);

const classification = JSON.parse(session.get(classification_first)) || [];


export default new vuex.Store({
    state:{
        'WXTOKEN': cookie.get(WXTOKEN),//判断微信用户
        'BASE_INFO': cookie.get(BASE_INFO),//基础信息 
        'WECHAT_INFO': cookie.get(WECHAT_INFO),//微信信息
        'searchWord':'',//搜索词
        'shop': [],//购物车信息
        'classification_first': classification,//一级导航,
        'classification_first_status': -1,//一级导航路由监测,
        'navIndex': 0,//底部导航,
        'referer': local.get(referer),
        'navStatus': false,//打包上线为true
        'order': 1,
        'addressCon': JSON.parse(local.get(addressInfo)),//edit  address
        'addressEdit': {
        	"guid": '', //收货地址ID
	        "userId": '',//用户ID
	        "userName": '',//收货人姓名
	        "mobile": '',//收货手机号
	        "provinceId": 1,//省份ID
	        "provinceName": '北京',//省份名称
	        "cityId": 1,//城市ID
	        "cityName": '北京市',//城市名称
	        "countyId": 1,//区县ID
	        "countyName": '怀柔区',//address
	        "address": '',//门牌信息
	        "addressDetail": '',//详细地址
	        "isDefault": 0,//否为默认地址
        },//地址副本  
        'shopCar': false,//数量选择
        'shopCarType': JSON.parse(local.get(SHOPCARTYPE)),//加入购物车 1  立即购买  2
        'shopCarBuy': JSON.parse(local.get(SHOPCARBUY)),//立即购买
        'shopCarBuypice': 0,//立即购买 价格
        'shopCarBuyAddress': JSON.parse(local.get(SHOPCARBUYADDRESS)),//立即购买  地址
        'shopCarCont': [
        	{
				"guid": 1, // 内容：npm安装后 mockjs/src/mock/random/xxx.js
		       	"goodsId": 1,
		       	"goodName": "鸭",
		        "netUrl": "https://ekuakao.oss-cn-beijing.aliyuncs.com/dp/goods/d7f6badab37e4ea58a862c852f852d76_1.jpg?Expires=3092467231&OSSAccessKeyId=LTAI3o1OZHRkwtpw&Signature=6WuXtfcv7yMMxQifUInBrNbL3DI%3D&code=1515667231051",
		        "goodStatus": 1,
		        "virtualSellNum": 1,
		        "originaPrice": 59.99,
		        "currentPrice": 59.99,
		        "goodNorm": "一只5斤",
		        "goodsNum": 2,
		        "avtive": true,
			},
        ],//购物车
        "shopCarSelect": true,//是否全选 默认全选
	    "count": "",//总价
        'ShopSelect': {},//购买弹窗,
        'ids': '',//图片上传的id
    },
    mutations: {
    	INCREMENT (state,payload){
	    	for (var value in payload) {
				var key_val = value;
				var value = payload[value];
			}
	    	state[key_val] = value;
	    },
	    INCREMENT_LIST (state,payload) {
	      	state.WXTOKEN = payload.WXTOKEN;
	      	state.shop = payload.shop;
	      	state.classification_first = payload.classification_first;
	    }
	},
	actions: {
		increment (context,keys){
			context.commit('INCREMENT',keys);
		},
		increment_list (context,payload) {
			context.commit('INCREMENT_LIST',payload);
		},
		calculation({ commit , state }){
			//购物车价格计算
			const count = state.shopCarCont;
			var  arr_count = [];
			var arr_pice = 0;
			for(var i = 0; i < count.length; i++){
				if(count[i]['avtive'] && (count[i]['goodStatus'] == 1)){
					arr_count.push(count[i]);
					arr_pice += parseFloat(count[i]['currentPrice']*100) * parseFloat(count[i]['goodsNum']);
				}
			}
			if(arr_pice == ''){
				arr_pice = 0;
			}else{
				arr_pice = arr_pice / 100;
			}
			if(count.length == arr_count.length){
				commit('INCREMENT', {
				    shopCarSelect: true
				})
			}else{
				commit('INCREMENT', {
				    shopCarSelect: false
				})
			}
			commit('INCREMENT', {
			    count: arr_pice
			})
			
		},
		editAddree({ commit , state }){
			const add = JSON.stringify(state.addressEdit);
			local.set(addressInfo,add);
			commit('INCREMENT', {
			    addressCon: state.addressEdit
			})
		},
		addAddrss({ commit , state }){
			const addressEdit= {
		        	"guid": '', //收货地址ID
			        "userId": '',//用户ID
			        "userName": '',//收货人姓名
			        "mobile": '',//收货手机号
			        "provinceId": 1,//省份ID
			        "provinceName": '北京',//省份名称
			        "cityId": 1,//城市ID
			        "cityName": '北京市',//城市名称
			        "countyId": 1,//区县ID
			        "countyName": '怀柔区',//address
			        "address": '',//门牌信息
			        "addressDetail": '',//详细地址
			        "isDefault": 0,//否为默认地址
		        }
			const add = JSON.stringify(addressEdit);
			local.set(addressInfo,add);
			commit('INCREMENT', {
			    addressCon: addressEdit
			})
		},
		setUpShopCarBuy({ commit , state },keys){
			commit('INCREMENT', {
			    shopCarBuy: keys
			})
			local.set(SHOPCARBUY,JSON.stringify(keys));
		},
		ShopCarBuyPice({ commit , state },keys){
			var arr_pice = 0;
			for(var i = 0; i < state.shopCarBuy.length; i++){
				arr_pice += parseFloat(state.shopCarBuy[i]['currentPrice']*100) * parseFloat(state.shopCarBuy[i]['goodsNum']);
			}
			if(arr_pice == ''){
				arr_pice = 0;
			}else{
				arr_pice = arr_pice / 100;
			}
			
			
			commit('INCREMENT', {
			    shopCarBuypice: arr_pice
			})
		},//
		setUpCarBuyAddress({ commit , state },keys){
			console.log(keys);
			commit('INCREMENT', {
			    shopCarBuyAddress: keys
			})
			local.set(SHOPCARBUYADDRESS,JSON.stringify(keys));
		},
		setUpCarType({ commit , state },keys){
			console.log(keys);
			commit('INCREMENT', {
			    shopCarType: keys
			})
			local.set(SHOPCARTYPE,JSON.stringify(keys));
		},
	}
})