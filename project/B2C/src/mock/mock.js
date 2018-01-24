/**
 * Created by suwt on 2017/3/9.
 */
import Mock from 'mockjs';
const Random = Mock.Random;

export default {
  mockData () {
  	Mock.mock('/shop/order/buy/count', {
  		"success": 1000,
      	"msg": "获取成功",
      	"goodsbuycount|2": [ 
	      	{
		        "name":  "@cname", 
		        "netUrl": "https://ekuakao.oss-cn-beijing.aliyuncs.com/dp/goods/d7f6badab37e4ea58a862c852f852d76_1.jpg?Expires=3092467231&OSSAccessKeyId=LTAI3o1OZHRkwtpw&Signature=6WuXtfcv7yMMxQifUInBrNbL3DI%3D&code=1515667231051",
		        "goodNorm": "",
		        "goodsId": 7,
		        "goodName": "鸭",
	      	}
      	]
  	});
  	Mock.mock('/good/test', {
  		"success": 1000,
      	"msg": "获取成功",
      	"list|16": [ 
	      	{
		        "name":  "@cname", 
	      	}
      	]
  	});
  	Mock.mock('/good/classification/first', {
      "success": 1000,
      "msg": "获取成功",
      "GoodClassification|16": [ 
	      {
	        "guid|+1": 1, // 内容：npm安装后 mockjs/src/mock/random/xxx.js
	        "pGuid|+1": 1,
	        "className": "@cname",
	        "classSort|+1": 1,
	      }
      ]
    });
    Mock.mock('/good/classification/getGoodClass', {
      "success": 1000,
      "msg": "获取成功",
      "GoodClassification|16": [ 
	      {
	        "guid|+1": 1, // 内容：npm安装后 mockjs/src/mock/random/xxx.js
	        "pGuid|+1": 1,
	        "className": "@cname",
	        "classSort|+1": 1,
	      }
      ]
    });
    
    Mock.mock('/good/list', {
      "success": 1000,
      "msg": "获取成功",
      "GoodClassification|20": [ 
	      {
	        "guid|+1": 1, // 内容：npm安装后 mockjs/src/mock/random/xxx.js
	        "pGuid|+1": 1,
	        "className": "@cname",
	        "classSort|+1": 1,
	      }
      ],
      "DpGoodsList|10": [ 
	      {
	        "guid|+1": 1, // 内容：npm安装后 mockjs/src/mock/random/xxx.js
	        "goodName": "@cname",
	        "classId|+1": 1,
	        "className": "@cname",
	        "goodFileId|+1": 1,
	        "netUrl": Random.image( '125x125' ),
	        "goodCounts|1-100": 100,
	        "virtualSellNum": /\d{1,2}/,
	        "originaPrice": /\d{1,2}/,
	        "currentPrice": /\d{1,2}/,
	        "goodNorm": "@cname",
	      }
      ]
    });
    Mock.mock('/good/search', {
      "success": 1000,
      "msg": "获取成功",
    })
    Mock.mock('/good/class/list', {
      	"success": 1000,
      	"msg": "获取成功",
      	"GoodClassification|5-15": [
      		{
      			"guid|+1": 1,
      			"pGuid|+1": 1,
      			"className": "@cname",
      			"classSort|+1": 1,
      		}
      	],
      	"DpGoodsList|16": [ 
	      	{
		        "guid|+1": 1, // 内容：npm安装后 mockjs/src/mock/random/xxx.js
		        "pguid|+1": 1,
		        "goodName": "@cname",
		        "classId|+1": 1,
		        "className": "@cname",
		        "goodFileId|+1": 1,
		        "netUrl": Random.dataImage('85x85' ),
		        "goodCounts|1-100": 100,
		        "virtualSellNum": /\d{1,2}/,
		        "originaPrice": /\d{1,2}/,
		        "currentPrice": /\d{1,2}/,
		        "goodNorm": "@cname",
	      	}
    	]
    });
    Mock.mock('/good/detail', {
      	"success": 1000,
      	"msg": "获取成功",
      	"DpGoodsDetail|1": [ 
	      	{
		        "guid|+1": 1, //商品ID
		        "goodName": "@cname",//商品名称
		        "classId|+1": 1,//商品分类ID
		        "className": "@cname",//分类名称
		        "goodFileId|+1": 1,//商品主图ID
		        "netUrl": Random.dataImage('300x200'),//主图地址
		        "goodCounts|1-100": 100,//商品库存量
		        "virtualSellNum": /\d{1,2}/,//已售数量
		        "originaPrice": /\d{1,2}/,//原价
		        "currentPrice": /\d{1,2}/,//现价
		        "goodNorm": "@cname",//规格
		        "sellStartDate": "@cname",//开始销售时间yyyy-MM-dd HH:mm:ss
		        "sellEndDate": "@cname",//结束销售时间yyyy-MM-dd HH:mm:ss
		        "content": "@cname",//商品详情介绍
		        "detailId": /\d{1,2}/,//详情图片ID
		        "detailImageUrl": Random.dataImage('300x500'),//商品详情图片地址
	      	}
      	]
    });
    Mock.mock('/good/area/userAddress', {
      	"success": 1000,
      	"msg": "获取成功",
      	"addressList|2-5": [ 
	      	{
		        "guid|+1": 1, //收货地址ID
		        "userId|+1": 1,//用户ID
		        "userName": "@cname",//收货人姓名
		        "mobile": /^1[3|4|5|7|8][0-9]{9}$/,//收货手机号
		        "provinceId|+10000": 120000,//省份ID
		        "provinceName": Random.province(),//省份名称
		        "cityId|+100": 110100,//城市ID
		        "cityName": Random.city(),//城市名称
		        "countyId|+1": 110101,//区县ID
		        "countyName": Random.county(),//address
		        "address": "@cname",//门牌信息
		        "addressDetail": "@cname",//详细地址
		        "isDefault|+1": 1,//否为默认地址
	      	}
      	]
    });
    Mock.mock('/good/area/setDefault', {
      	"success": 1000,
      	"msg": "获取成功",
    });
    Mock.mock('/good/area/delAddress', {
      	"success": 1000,
      	"msg": "获取成功",
    });
    Mock.mock('/shop/car/list', {
      	"success": 1000,
      	"msg": "获取成功",
      	"DpShopCars":  [ 
	      	{
		        "guid|+1": 1, //购物车ID
		        "goodsId|+1": 1, //商品ID,
		        "goodName": "@cname",//商品名称
		        "netUrl": Random.dataImage('300x200'),//主图地址
		        "goodsNum|+1": 1,//数量
		        "goodStatus": 1,//状态   （0未上架，1已上架/售卖中，2已售完））
		        "originaPrice": /\d{1,2}/,//原价
		        "currentPrice": /\d{1,2}/,//现价
		        "goodNorm": "@cname",//规格
	      	}
      	]
    });
    Mock.mock('/shop/car/modify', {
      	"success": 1000,
      	"msg": "获取成功",
    });
    Mock.mock('/api/user', {
      "code": "000",
      "datas": {
        "name": "@cname", // 内容：npm安装后 mockjs/src/mock/random/xxx.js
        "area": "@province(true)",
        "identity": "超级管理员"
      }
    });
    Mock.mock('/api/getTable', {
      "code": "000",
      "datas|5-20": [
        {
          "date": '@date("yyyy-MM-dd")',
          "name": "@cname",
          "address": "@county(true)"
        }
      ]
    });
    Mock.mock('/api/getOptions', {
      "code": "000",
      "datas|5-7": [
        {
          "label": '广东省',
          "value": "@natural(10, 100)",
          "children|5-8": [
            {
              "label": '深圳市',
              "value": "@natural(10, 100)",
              "children|5-5": [
                {
                  "label": '南山区',
                  "value": "@natural(10, 100)"
                }
              ]
            }
          ]
        }
      ],
      "places|9-18": [
        {
          "label": '广东省',
          "value": "@natural(10, 100)"
        }
      ]
    });
  }
};
