<template>
	<div class="businessQualification">
		<userlist :userList="license"></userlist>
		<userlist :userList="quarantineTicket"></userlist>
		<userlist :userList="chickenTicket"></userlist>
		<userlist :userList="beefTicket"></userlist>
		<userlist :userList="duckTicket"></userlist>
		<userlist :userList="porkTicket"></userlist>
		<userlist :userList="pastriesTicket"></userlist>
		<userlist :userList="otherTicket"></userlist>
	</div>
</template>

<script>
	import userlist from '../usercomponent/userList';
	export default {
		data(){
			return {
				'license':{
					'name': '营业执照',
					'icon': 'icon-changyongqindan_red',
					'link': '/busiImage',
					'borderBottomStatus': true,
				},
				'quarantineTicket':{
					'name': '调理类检疫票',
					'icon': 'icon-changyongqindan_red',
					'link': '/busiImage',
					'borderBottomStatus': true,
				},
				'chickenTicket':{
					'name': '鸡肉类检疫票',
					'icon': 'icon-changyongqindan_red',
					'link': '/busiImage',
					'borderBottomStatus': true,
				},
				'beefTicket':{
					'name': '牛肉类检疫票',
					'icon': 'icon-changyongqindan_red',
					'link': '/busiImage',
					'borderBottomStatus': true,
				},
				'duckTicket':{
					'name': '鸭肉类检疫票',
					'icon': 'icon-changyongqindan_red',
					'link': '/busiImage',
					'borderBottomStatus': true,
				},
				'porkTicket':{
					'name': '猪肉类检疫票',
					'icon': 'icon-changyongqindan_red',
					'link': '/busiImage',
					'borderBottomStatus': true,
				},
				'pastriesTicket':{
					'name': '面食类检疫票',
					'icon': 'icon-changyongqindan_red',
					'link': '/busiImage',
					'borderBottomStatus': true,
				},
				'otherTicket':{
					'name': '其他类检疫票',
					'icon': 'icon-changyongqindan_red',
					'link': '/busiImage',
					'borderBottomStatus': true,
				},
			}
		},
		created(){
			
		},
		methods: {
			
		},
		components:{
			userlist
		}
	}
</script>

<style scoped>
	
</style>