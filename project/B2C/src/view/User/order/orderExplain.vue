<template>
	<div class="orderExplain">
		<order-content :ProceContent="ProceContent"></order-content>
	</div>
</template>

<script>
	import orderContent from 'view/User/order/orderContent';
	export default {
		data(){
			return {
				'ProceContent': '我还在等待一个拥抱我还在等待一个拥抱我还在等待一个拥抱',
			}
		},
		
		created(){
				
		},
		methods: {
			
		},
		components:{
			orderContent,
		}
	}
</script>

<style lang="css" scoped>
	.orderExplain {
		min-height: 18rem;
		background: #fff;
	}
	.active {
		font-size: 0.5rem;
	}
	.orderContent /deep/ .ProceContent {
		font-size: 0.437rem;
		padding: 0.5rem;
		border: 0;
		color: #333333;
	}
	.orderContent >>> .ProceContent {
		font-size: 0.437rem;
		padding: 0.5rem;
		border: 0;
		color: #333333;
	}
</style>