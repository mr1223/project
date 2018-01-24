<template>
	<div class="orderRefundProce">
		<!--<order-title :name="name"></order-title>-->
		<refund-proce :refund="refund" :content="content"></refund-proce>
		<div class="RefundProceContent">
			<shop-title :title="title"></shop-title>
			<div class="addressMange">
				<div class="address">
					<label>收货地址</label><b>：</b>
					<span>北京市海淀区沙河102</span>
					<div style="clear: both;"></div>
				</div>
				<div class="address">
					<label>收 货 人 </label><b>：</b>
					<span>张飞</span>
					<div style="clear: both;"></div>
				</div>
				<div class="address">
					<label>联系电话</label><b>：</b>
					<span>13455675546</span>
					<div style="clear: both;"></div>
				</div>
			</div>
			<user-list :userList="refundCompent"></user-list>
			<user-list :userList="refundAddress"></user-list>
			<div class="refundContent">
				请在5日内将退货快递公司及快递单号填写在此空内
			</div>
		</div>
		<div class="RefundProceContent">
			<shop-title :title="message"></shop-title>
			<good-number :key="tode" v-for="(tode,index) in orderList" :list="tode"></good-number>
		</div>
		
		<div class="RefundProceContent">
			<user-list :userList="refundAmount"></user-list>
			<user-list :userList="refundResource"></user-list>
			<order-content :ProceContent="ProceContent"></order-content>
			<user-list :userList="refundTime"></user-list>
			<user-list :userList="refundResour"></user-list>
			<order-image :add="orderImage"></order-image>
		</div>
		<div class="RefundProceContent">
			<user-list :userList="Resource"></user-list>
		</div>
		<!--
        	作者：980267269@qq.com
        	时间：2018-01-22
        	描述：submit
        -->
        <order-refund-btn @submit="sub"></order-refund-btn>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import orderTitle from 'view/User/order/orderTitle';
	import refundProce from 'view/User/order/refundProce';
	import goodNumber from 'view/Goods/bizcomponent/goodNumber';
	import userList from 'view/User/usercomponent/userList';
	import orderImage from 'view/User/order/orderImage';
	import orderContent from 'view/User/order/orderContent';
	import shopTitle from 'view/Goods/bizcomponent/shopTitle';
	import orderRefundBtn from 'view/User/order/orderRefundBtn';
	import { wind } from 'common/public';
	export default {
		data(){
			return {
				'name': '您已经成功发起退款申请,请耐心等待我们处理',
				'content': '我还在等待一个拥抱',
				'refund': {
					'status': 2
				},
				'title': '退货信息',
				'refundCompent': {
					'name': '快递公司',
					'inputTxt': true,
					'inputText': '',
					'borderBottomStatus': true,
				},
				'refundAddress': {
					'name': '快递单号',
					'inputTxt': true,
					'inputText': '',
					'borderBottomStatus': true,
				},
				'message': '退货信息',
				'orderList': [],//商品信息
				'refundAmount': {
					'name': '退款金额',
					'icon': 'icon-changyongqindan_red',
					'text': '￥1300.00',
					'borderBottomStatus': true,
				},
				'refundResource': {
					'name': '退款原因',
					'borderBottomStatus': false,
				},
				'ProceContent': '我还在等待一个拥抱我还在等待一个拥抱我还在等待一个拥抱',
				'refundTime': {
					'name': '申请时间',
					'icon': 'icon-changyongqindan_red',
					'text': '2018-01-22 17:25',
					'borderBottomStatus': true,
					'userTextActive': true,
				},
				'refundResour': {
					'name': '售后凭证',
				},
				'Resource': {
					'name': '联系客服',
					'icon': 'icon-changyongqindan_red',
					'admin': '张三',
					'tel': '18910895936',
					'borderBottomStatus': true,
				},
				'orderImage': false,
			}
		},
		
		created(){
				
		},
		methods: {
			sub(){
				console.log(this.refundInput);
			}
		},
		components:{
			orderTitle,
			refundProce,
			goodNumber,
			userList,
			orderImage,
			orderContent,
			shopTitle,
			orderRefundBtn,
		}
	}
</script>

<style scoped>
	.RefundProceContent {
		margin-top: 0.218rem;
		background: #fff;
	}
	
	.addressMange {
		padding: 0.4rem;
		border-bottom: 0.032rem solid #f2f2f2;
	}
	.address {
		margin-bottom: 0.2rem;
		font-size: 0.437rem;
		color: #666;
	}
	.address label {
		float: left;
		width: 2rem;
	}
	.address b {
		float: left;
		color: #666;
		font-weight: 500;
	}
	.address span {
		float: left;
		width: 6.7rem;
		color: #151515;
	}
	.refundContent {
		height: 1.312rem;
		line-height: 1.312rem;
		padding-left: 5%;
		background: #fff;
		color: #FFB1BF;
		font-size: 0.375rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
</style>