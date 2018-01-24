<template>
	<div class="goodContent">
		<router-link :to="{name:'goodDetail',params: {id: content.guid}}">
			<div class="shopListImg">
				<img :src="content.netUrl" />
			</div>
			<div class="shop_content">
				<p>信生  鸡胸肉</p>
				<p>9.4kg/箱</p>
				<p>￥98.00</p>
			</div>
		</router-link>
	</div>
</template>

<script>
	import bottom from 'component/bottom';
	export default {
		data(){
			return {}
		},
		props:{
			content:null
		},
		created(){
			console.log(this.content);
		},
		components:{
			bottom,
		}
	}
</script>

<style scoped>
	.goodContent {
		float: left;
	}
	.shopListImg {
		float: left;
		width: 2.8rem;
	}
	.shopListImg img {
		max-width: 100%;
	}
	.shop_content {
		float: left;
		margin-left: 0.375rem;
	}
</style>