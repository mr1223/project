<template>
	<div class="orderRefund">
		<good-number :key="tode" v-for="(tode,index) in orderList" :list="tode"></good-number>
		<!--<order-number :list="orderList"></order-number>-->
		<user-list @getClick="getType" :userList="refundType"></user-list>
		<user-list @getClick="getResoure" :userList="refundResoure"></user-list>
		<user-list :userList="refundAmount"></user-list>
		<user-list :userList="refundExplain"></user-list>
		<order-message :message="message"></order-message>
		<order-image :add="orderImage"></order-image>
		<order-refund-btn @submit="sub"></order-refund-btn>
		<mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">  
          	<div class="picker-toolbar">  
	            <span class="mint-datetime-action mint-datetime-cancel" @click="cancleType">取消</span>  
	            <span class="mint-datetime-action mint-datetime-confirm" @click="selectType">确定</span>  
          		<div style="clear: both;"></div>
          	</div>  
          	<mt-picker :slots="slot" value-key ="name" @change="onTypeChange" :visible-item-count="3"></mt-picker>  
        </mt-popup>
        <mt-popup v-model="popupVisibles" position="bottom" class="mint-popup-4">  
          	<div class="picker-toolbar">  
	            <span class="mint-datetime-action mint-datetime-cancel" @click="cancleResoure">取消</span>  
	            <span class="mint-datetime-action mint-datetime-confirm" @click="selectResoure">确定</span>  
          		<div style="clear: both;"></div>
          	</div>  
          	<mt-picker :slots="slots" value-key ="name" @change="onResoureChange" :visible-item-count="3"></mt-picker>  
        </mt-popup>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { Toast,Indicator,Picker,Popup } from 'mint-ui';
	import { shopOrderDetail } from 'common/path';
	import goodNumber from 'view/Goods/bizcomponent/goodNumber';
	import userList from 'view/User/usercomponent/userList';
	import orderMessage from 'view/User/order/orderMessage';
	import orderImage from 'view/User/order/orderImage';
	import orderRefundBtn from 'view/User/order/orderRefundBtn';
	import { wind } from 'common/public';
	export default {
		data(){
			return {
				'orderList': [],//商品信息
				'refundType': {
					'name': '退款类型',
					'icon': 'icon-changyongqindan_red',
					'select': true,
					'userTextSelect': '',
					'userSelectID': '',
					'borderBottomStatus': true,
				},
				'refundResoure': {
					'name': '退款原因',
					'icon': 'icon-changyongqindan_red',
					'select': true,
					'userTextSelect': '',
					'userSelectID': '',
					'borderBottomStatus': true,
				},
				'refundAmount': {
					'name': '退款金额',
					'icon': 'icon-changyongqindan_red',
					'text': '￥1300.00',
					'borderBottomStatus': true,
				},
				'refundExplain': {
					'name': '退款说明 ',
					'icon': 'icon-changyongqindan_red',
					'text': '',
					'borderBottomStatus': false,
				},
				'message': {
					'content': '',
					'place': '请输入具体描述',
				},
				'orderImage': true,
				'popupVisible': false,
				'slot': [
					{
			          	flex: 1,
			          	values: [
			          		{
			          			'name': '退货退款',
			          			'id': 1,
			          		},
			          		{
			          			'name': '仅退款',
			          			'id': 2,
			          		},
			          	],
			          	className: 'slot1',
			          	textAlign: 'center',
			          	defaultIndex: 0,
			        }, 
				],
				'slotSelect':{},
				'popupVisibles': false,
				'slots': [
					{
			          	flex: 1,
			          	values: [
			          		{
			          			'name': '缺货',
			          			'id': 1,
			          		},
			          		{
			          			'name': '多拍了，不想要',
			          			'id': 2,
			          		},
			          	],
			          	className: 'slot1',
			          	textAlign: 'center',
			          	defaultIndex: 0,
			        }, 
				],
				'slotsSelect':{},
			}
		},
		
		created(){
			this.load();
		},
		methods: {
			load(){
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
			    		//_that.shopCarBuyAddress = arr_address;
			    		//商品处理
			    		const arr_shop = [];
			    		for(var i = 0; i < order.orderDetail.length; i++){
			    			order.orderDetail[i]['goodsNum'] = order.orderDetail[i]['orderNum'];
			    			order.orderDetail[i]['currentPrice'] = order.orderDetail[i]['childOrderPrice'] * 100 / order.orderDetail[i]['orderNum'];
			    			order.orderDetail[i]['currentPrice'] = order.orderDetail[i]['currentPrice'] / 100;
			    			order.orderDetail[i]['status'] = 1;
			    			arr_shop.push(order.orderDetail[i]);
			    		}
			    		
			    		_that.orderList = arr_shop;
			    		//订单总金额
			    		//_that.orderPrice = order.orderPrice;
			    		//订单信息
			    		//_that.order = order;
			    		
			    	}
			  	})
			    .catch(function (error) {
			  		Indicator.close();
			    	console.log(error);
				});	
			},
			sub(){
				console.log('ddd');
			},
			getType(e){
				this.popupVisible = true;
			},
			getResoure(){
				this.popupVisibles = true;
			},
			onTypeChange(picker,val){
				this.slotSelect = val;
			},
			cancleType(){
				this.popupVisible = false;
			},
			selectType(){
				console.log(this.slotSelect);
				this.refundType['userTextSelect'] = this.slotSelect[0]['name'];
				this.refundType['userSelectID'] = this.slotSelect[0]['id'];
				console.log(this.refundType);
				this.popupVisible = false;
			},
			onResoureChange(picker,val){
				this.slotsSelect = val;
			},
			cancleResoure(){
				this.popupVisibles = false;
			},
			selectResoure(){
				this.refundResoure['userTextSelect'] = this.slotsSelect[0]['name'];
				this.refundResoure['userSelectID'] = this.slotsSelect[0]['id'];
				this.popupVisibles = false;
			},
		},
		components:{
			goodNumber,
			userList,
			orderMessage,
			orderImage,
			mtPicker: Picker,
			mtPopup: Popup,
			orderRefundBtn,
		}
	}
</script>

<style scoped>
	.mint-popup-4 {
		width: 100%;
	}
	.mint-datetime-action {
		color: #fc2a2e;
	}
</style>