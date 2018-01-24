<template>
	<div class="user">
		<usermessage></usermessage>
		<div class="myOrder">
			<userlist :userList="myOrder"></userlist>
		</div>
		<userorder></userorder>
		<div class="user_list_first">
			<userlist :userList="goodList"></userlist>
			<userlist :userList="address"></userlist>
			<userlist :userList="advisor"></userlist>
			<userlist :userList="service"></userlist>
		</div>
		
		<userlist :userList="process"></userlist>
		<userlist :userList="feedback"></userlist>
		<userlist :userList="business"></userlist>
		<login-out></login-out>
		<bottom></bottom>
	</div>
	
</template>

<script>
	import bottom from 'component/bottom';//loginShopOut
	import loginOut from 'component/loginOut';
	import usermessage from '../usercomponent/userMessage';
	import userorder from '../usercomponent/userOrder';
	import userlist from '../usercomponent/userList';
	
	export default {
		data(){
			return {
				'myOrder': {
					'name': '我的订单',
					'icon': 'icon-changyongqindan_red',
					'link': '/order/1',
					'admin': '全部订单',
					'borderBottomStatus': true,
				},
				'goodList':{
					'name': '常用清单',
					'icon': 'icon-changyongqindan_red',
					'link': '/shopList',
					'borderBottomStatus': true,
				},
				'address':{
					'name': '地址管理',
					'icon': 'icon-changyongqindan_red',
					'link': '/addressMange',
					'borderBottomStatus': true,
				},
				'advisor':{
					'name': '专属顾问',
					'icon': 'icon-changyongqindan_red',
					'admin': '张三',
					'tel': '18910895936',
					'borderBottomStatus': true,
				},
				'service':{
					'name': '客服电话',
					'icon': 'icon-changyongqindan_red',
					'tel': '18910895936',
					'borderBottomStatus': false,
				},
				'process':{
					'name': '购物流程',
					'icon': 'icon-changyongqindan_red',
					'link': '/shopList',
					'borderBottomStatus': true,
				},
				'feedback':{
					'name': '意见反馈',
					'icon': 'icon-changyongqindan_red',
					'link': '/userFeedback',
					'borderBottomStatus': true,
				},
				'business':{
					'name': '营业资质',
					'icon': 'icon-changyongqindan_red',
					'link': '/businessQualification',
					'borderBottomStatus': false,
				},
			}
		},
		created(){
			this.$store.commit('INCREMENT', {
			    navIndex: 4
			})
		},
		methods: {
			loginOut(){
				
			}
		},
		components:{
			bottom,
			usermessage,
			userorder,
			userlist,
			loginOut,
		}
	}
</script>

<style scoped>
	.user {
		
	}
	.myOrder {
		margin-top: 0.218rem;
	}
	.user_list_first {
		margin: 0.218rem 0;
	}
	
</style>