<template>
	<div class="orderRefundProce">
		<!--<order-title :name="name"></order-title>-->
		<refund-proce :refund="refund" :content="content"></refund-proce>
		<div class="RefundProceContent">
			<user-list :userList="refundAmount"></user-list>
		</div>
		
		<div class="RefundProceContent">
			<shop-title :title="title"></shop-title>
			<good-number :key="tode" v-for="(tode,index) in orderList" :list="tode"></good-number>
			<div class="addressMange">
				<div class="address">
					<label>退款原因</label><b>：</b>
					<span>豆腐花和法律开的胡椒粉</span>
					<div style="clear: both;"></div>
				</div>
				<div class="address">
					<label>退款金额</label><b>：</b>
					<span>¥565.00</span>
					<div style="clear: both;"></div>
				</div>
				<div class="address">
					<label>申请时间</label><b>：</b>
					<span>2019-09-09   12:00</span>
					<div style="clear: both;"></div>
				</div>
				<div class="address">
					<label>退款编码</label><b>：</b>
					<span>45465768789768976</span>
					<div style="clear: both;"></div>
				</div>
			</div>
		</div>
		<div class="RefundProceContent">
			<user-list :userList="Resource"></user-list>
			<user-list :userList="complaint"></user-list>
		</div>
		<!--
        	作者：980267269@qq.com
        	时间：2018-01-22
        	描述：submit
        -->
       
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import orderTitle from 'view/User/order/orderTitle';
	import refundProce from 'view/User/order/refundProce';
	import goodNumber from 'view/Goods/bizcomponent/goodNumber';
	import userList from 'view/User/usercomponent/userList';
	import shopTitle from 'view/Goods/bizcomponent/shopTitle';
	import { wind } from 'common/public';
	export default {
		data(){
			return {
				'name': '您已经成功发起退款申请,请耐心等待我们处理',
				'content': '我还在等待一个拥抱',
				'refund': {
					'status': 3
				},
				'title': '退款信息',
				'orderList': [],//商品信息
				'refundAmount': {
					'name': '退款金额',
					'icon': 'icon-changyongqindan_red',
					'text': '￥1300.00',
					'borderBottomStatus': true,
				},
				'Resource': {
					'name': '联系客服',
					'icon': 'icon-changyongqindan_red',
					'admin': '张三',
					'tel': '18910895936',
					'borderBottomStatus': true,
				},
				'complaint':{
					'name': '常用清单',
					'icon': 'icon-changyongqindan_red',
					'link': '/shopList',
					'borderBottomStatus': true,
				},
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
			shopTitle,
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