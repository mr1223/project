

//本地配置
const root_url = '/';//链接url
const root_img = 'http://localhost';//配置图片
const domin = '';//配置cookie
const Admin = 'http://localhost/Admin/';//接口url
//打包配置
/*const root_url = '/Admin/';//链接url
const root_img = '';//配置图片
const domin = '';//配置cookie
const Admin = '/Admin/';//接口url*/
//前台页面
const newIndex = root_url + 'New/index.html';
const newDetail = root_url + 'New/detail.html';
const login = root_url + 'Login/index.html';
//后台接口
const api = '';//  /wechat   
const api_classification_first = api + '/good/classification/first';
const getGoodClass = api + '/good/classification/getGoodClass';
const goodList = api +  '/good/list';
const goodSearch = api +  '/good/search';//商品搜索
const goodClassList = api +  '/good/class/list';
const goodDetailApi = api +  '/good/detail';//商品详情
const shopCarModify = api +  '/shop/car/modify';//加入购物车
const shopCarList = api +  '/shop/car/list';//购物车列表
const shopCarDel = api +  '/shop/car/del';//购物车列表
const shopOrderAddGoods = api +  '/shop/order/add/goods';//直接创建订单
const shopOrderAddShopcar = api +  '/shop/order/add/shopcar';//购物车提交订单
const shopOrderList = api +  '/shop/order/list';//订单列表
const shopOrderGet = api +  '/shop/order/get';//订单信息
const shopOrderLogistics = api +  '/shop/order/logistics';//待发货订单与已发货订单
const shopOrderDetail = api +  '/shop/order/detail';//订单详情
const shopOrderPay = api +  '/shop/order/detail';//支付
const evaluationAdd= api +  '/evaluation/add';//增加评论
const evaluationList= api +  '/evaluation/list';//分页评论列表
const shopOrderReceive= api +  '/shop/order/receive';//确认收货
const shopOrderDelete= api +  '/shop/order/delete';//删除订单
const shopOrderBuyCount= api +  '/shop/order/buy/count';//分页获取常购清单

const listAllProvince = api +  '/good/area/listAllProvince';//省份获取
const listCity = api +  '/good/area/listCity';//城市获取
const listCounty = api +  '/good/area/listCounty';//区县获取
const userAddressList = api +  '/good/area/userAddress';//地址列表
const userAddress = api +  '/good/area/saveUserAddress';//添加地址
const setDefault = api +  '/good/area/setDefault';//设置默认地址
const addressRemove = api +  '/good/area/delAddress';//删除地址
const loginCheck = api +  '/shop/login/check';//登录check
const loginCheckCode = api +  '/sms/code/';//获取验证
const loginShopIn = api +  '/shop/login/in';//登录
const loginShopOut = api +  '/shop/login/out';//退出登录
const loginAuth = api +  '/wechat/auth';//微信认证
const loginCode = api +  '/wechat/getcode';//获取code
export default {
	api,
	api_classification_first,
	getGoodClass,
	goodList,
	goodSearch,
	goodClassList,
	goodDetailApi,
	shopCarModify,
	shopCarList,
	shopCarDel,
	shopOrderAddGoods,
	shopOrderAddShopcar,
	shopOrderList,
	shopOrderGet,
	shopOrderLogistics,
	shopOrderDetail,
	shopOrderPay,
	evaluationAdd,
	evaluationList,
	shopOrderReceive,
	shopOrderDelete,
	shopOrderBuyCount,
	listAllProvince,
	listCity,
	listCounty,
	userAddressList,
	userAddress,
	setDefault,
	addressRemove,
	loginCheck,
	loginCheckCode,
	loginShopIn,
	loginShopOut,
	loginAuth,
	loginCode,
}
export {
	api,
	api_classification_first,
	getGoodClass,
	goodList,
	goodSearch,
	goodClassList,
	goodDetailApi,
	shopCarModify,
	shopCarList,
	shopCarDel,
	shopOrderAddGoods,
	shopOrderAddShopcar,
	shopOrderList,
	shopOrderGet,
	shopOrderLogistics,
	shopOrderDetail,
	shopOrderPay,
	evaluationAdd,
	evaluationList,
	shopOrderReceive,
	shopOrderDelete,
	shopOrderBuyCount,
	listAllProvince,
	listCity,
	listCounty,
	userAddressList,
	userAddress,
	setDefault,
	addressRemove,
	loginCheck,
	loginCheckCode,
	loginShopIn,
	loginShopOut,
	loginAuth,
	loginCode,
}
