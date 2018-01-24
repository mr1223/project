<template>
	<div class="userOrder">
		<ul>
			<li :style="{width:100/Order.length + '%',}" v-for="tode in Order">
				<router-link  :to="tode.link">
					<i :class="tode.icon" class="shop_gouwuche iconfont" ></i>
					<span>{{tode.name}}</span>
				</router-link>
			</li>
			<div style="clear: both;"></div>
		</ul>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				'Order': [
					{
						'name': '待付款',
						'icon': 'icon-daifukuan',
						'link': '/order/2',
					},
					{
						'name': '待发货',
						'icon': 'icon-daifahuo',
						'link': '/order/3',
					},
					{
						'name': '待收货',
						'icon': 'icon-daishouhuo',
						'link': '/order/4',
					},
					{
						'name': '待评价',
						'icon': 'icon-daipingjia',
						'link': '/order/5',
					},
					{
						'name': '售后/退款 ',
						'icon': 'icon-shouhou',
						'link': '/order/6',
					},
					
				]
			}
		},
		created(){
			
		},
		methods: {
			
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.userOrder {
		border-bottom: solid 1px #ccc;
		background: #fff;
	}
	.userOrder ul {
		padding: 0.281rem 0;
	}
	.userMessage {
		padding: 0.218rem 0;
		height: 1.31rem;
		background: #fff;
	}
	.userMessage span {
		float: left;
		margin-left: 0.218rem;
		width: 1.31rem;
		height: 1.31rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.userMessage span img {
		width: 100%;
	}
	.userMessage label {
		float: left;
		margin-left: 0.218rem;
		line-height: 1.31rem;
		font-size: 0.437rem;
		overflow: hidden;
	}
	.userOrder ul li {
		float: left;
		text-align: center;
	}
	.userOrder ul li i {
		font-size: 0.7rem;
		color: #fc2a2e;
	}
	.userOrder ul li span {
		display: block;
		font-size: 0.375rem;
		color: #666666;
	}
</style>