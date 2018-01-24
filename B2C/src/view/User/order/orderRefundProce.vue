<template>
	<div class="orderRefundProce">
		<!--<order-title :name="name"></order-title>-->
		<refund-proce :refund="refund" :content="content"></refund-proce>
		<good-number :key="tode" v-for="(tode,index) in orderList" :list="tode"></good-number>
		<div class="RefundProceContent">
			<user-list :userList="refundAmount"></user-list>
			<user-list :userList="refundResource"></user-list>
			<order-content :ProceContent="ProceContent"></order-content>
			<user-list :userList="refundTime"></user-list>
			<order-image :add="orderImage"></order-image>
		</div>
		<div class="RefundProceContent">
			<user-list :userList="Resource"></user-list>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import orderTitle from 'view/User/order/orderTitle';
	import refundProce from 'view/User/order/refundProce';
	import goodNumber from 'view/Goods/bizcomponent/goodNumber';
	import userList from 'view/User/usercomponent/userList';
	import orderContent from 'view/User/order/orderContent';
	import orderImage from 'view/User/order/orderImage';
	import { wind } from 'common/public';
	export default {
		data(){
			return {
				'name': '您已经成功发起退款申请,请耐心等待我们处理',
				'content': '我还在等待一个拥抱',
				'refund': {
					'status': 1
				},
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
			
		},
		components:{
			orderTitle,
			refundProce,
			goodNumber,
			userList,
			orderImage,
			orderContent,
		}
	}
</script>

<style scoped>
	.RefundProceContent {
		margin-top: 0.218rem;
	}
	.ProceContent {
		padding: 0 0.4rem;
		font-size: 0.375rem;
		color: #666;
		background: #fff;
	}
</style>