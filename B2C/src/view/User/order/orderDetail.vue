<template>
	<div class="goodBuy">
		<div class="goodBuyAddress">
			<address-name-list :addressName="shopCarBuyAddress"></address-name-list>
		</div>
		<div class="goodNumber">
			<good-number :key="tode" v-for="(tode,index) in shopCarBuy" :order="order" :list="tode"></good-number>
		</div>
		<div class="goodCount">
			合计：¥{{orderPrice}}
		</div>
		<div class="payStyle">
			<shop-title :title="payStyle"></shop-title>
		</div>
		<div class="payStyleContent">
			<p v-if="order.mainOrderNo">订单编号：{{order.mainOrderNo}}</p>
			<p v-if="order.orderTime">创建时间：{{order.orderTime}}</p>
			<p v-if="order.payTime">付款时间：{{order.payTime}}</p>
			<p v-if="order.logisticsTime">发货时间：{{order.logisticsTime}}</p>
		</div>
		<div class="goodBuyBtn">
			<div v-if="order.orderStatus == 1" class="goodBtnCon">
				<span>合计：¥{{orderPrice}}</span>
				<a @click="goPay(order.mainOrderNo)">支付</a>
			</div>
			<div v-if="order.orderStatus == 2" class="goodBtnCon">
				<span @click="refund(order.mainOrderNo)">申请退款</span>
				<a @click="goodDeliver" v-if="order.logisticsStatus == 1">提醒发货</a>
				<a @click="confirReceipt(order.mainOrderNo)" v-if="order.logisticsStatus == 2">确认收货</a>
				<a @click="goodEvaluate" v-if="order.logisticsStatus == 3">评价</a>
			</div>
			<!--<div v-if="order.orderStauts == 7" class="goodBtnCon">
				<label>退款成功</label>
				<span>退款金额：¥1222.99</span>
				<div style="clear: both;"></div>
			</div>-->
		</div>
	</div>
</template>

<script>
	import { MessageBox,Indicator } from 'mint-ui';
	import addressNameList from 'view/User/bizcomponent/addressNameList';
	import goodNumber from 'view/Goods/bizcomponent/goodNumber';
	import shopTitle from 'view/Goods/bizcomponent/shopTitle';
	import { wind } from 'common/public';
	import { shopOrderDetail,shopOrderReceive } from 'common/path';
	export default {
		data(){
			return {
				'payStyle': '订单信息',
				'orderPrice': 0,//订单总金额
				'shopCarBuy': [],//商品信息
				'shopCarBuyAddress': {},//订单信息
				'order': {},//订单信息
			}
		},
		created(){
			Indicator.open({
			  	text: '加载中...',
			  	spinnerType: 'fading-circle'
			});
			const _that = this;
			const obj = {
				mainOrderNo: this.$route.params.id
			}
		  	
		 
		   	this.$http.post(shopOrderDetail,wind.stringify(obj))
		    .then(function (response) {
		    	Indicator.close();
		    	const data = response.data;
		    	if(data.success == 1000){
		    		const order = data.order;
		    		const orderDetail = order.orderDetail[0];
		    		//地址处理
		    		const arr_address = {};
		    		arr_address['userName'] = order['receiveUserName'];
		    		arr_address['mobile'] = order['receiveMobilePhone'];
		    		arr_address['addressDetail'] = order['receiveAddressDetail'];
		    		arr_address['status'] = 1;
		    		_that.shopCarBuyAddress = arr_address;
		    		//商品处理
		    		const arr_shop = [];
		    		for(var i = 0; i < order.orderDetail.length; i++){
		    			order.orderDetail[i]['goodsNum'] = order.orderDetail[i]['orderNum'];
		    			order.orderDetail[i]['currentPrice'] = order.orderDetail[i]['childOrderPrice'] * 100 / order.orderDetail[i]['orderNum'];
		    			order.orderDetail[i]['currentPrice'] = order.orderDetail[i]['currentPrice'] / 100;
		    			order.orderDetail[i]['status'] = 1;
		    			arr_shop.push(order.orderDetail[i]);
		    		}
		    		
		    		_that.shopCarBuy = arr_shop;
		    		//订单总金额
		    		_that.orderPrice = order.orderPrice;
		    		//订单信息
		    		_that.order = order;
		    		
		    	}
		  	})
		    .catch(function (error) {
		  		Indicator.close();
		    	console.log(error);
			});	
		},
		methods: {
			goodPay(){
				
			},
			goodDeliver(){
				
			},
			goodPay(){
				
			},
			goodEvaluate(){
				
			},
			confirReceipt(e){
				const _that = this;
				MessageBox.confirm('',{
					title: '提示',
					message : '请确认您的货品已收到？',
					confirmButtonClass : 'messActive',
					cancelButtonClass: 'cancelMessActive',
				})
				.then(action => {
					const obj = {
						mainOrderNo: e
					}
				  	this.$http.post(shopOrderReceive,wind.stringify(obj))
				    .then(function (response) {
				    	const data = response.data;
				    	if(data.success == 1000){
				    		_that.$router.push({name: 'order',params:{id:5}});
				    	}
				    	
				  	})
				  	.catch(function (error) {
				    	
					});
				  
				  
				  
				},() => {
					
				})
			},
			goPay(e){
				this.$router.push({name: 'goodBuy',params: { id: 3 },query:{ mainOrderNo: e }});
			},
			refund(e){
				this.$router.push({name: 'goodOrderRefund',params: { id: e}});
			}
		},
		components:{
			addressNameList,
			goodNumber,
			shopTitle,
			
		},
		watch: {
			
		}
	}
</script>

<style scoped>
	.goodBuy {
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.goodBuyAddress {
		width: 10rem;
		height: auto;
	}
	.goodNumber {
		margin-top: 0.218rem;
	}
	.payStyle {
		margin-top: 0.218rem;
	}
	.payStyleContent {
		background: #fff;
		color: #999;
		font-size: 0.406rem;
		padding: 0.3rem 0.4rem 3rem;
	}
	.payStyleContent p {
		padding: 0.1rem;
	}
	.goodCount {
		padding: 0.4rem;
		background: #fff;
		color: #fc2a2e;
		text-align: right;
		font-size: 0.406rem;
		font-weight: 600;
	}
	.goodBuyBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
		font-size: 0.406rem;
		text-align: center;
	}
	.goodBuyBtn span {
		float: left;
		width: 50%;
		height: 1.312rem;
		line-height: 1.312rem;
		background: #fff;
		color: #FC2A2E;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.goodBuyBtn a {
		float: left;
		width: 50%;
		height: 1.312rem;
		line-height: 1.312rem;
		background: #FC2A2E;
		color: #fff;
		border-radius: 0;
		text-align: center;
	}
</style>