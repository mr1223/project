<template>
	<div class="orderTitle">
		<h4>{{name}}</h4>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: {
			name: null
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
	.orderTitle {
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
		padding: 0 0.4rem;
		background: #FC2A2E;
		color: #fff;
		font-size: 0.375rem;
	}
	.orderTitle h4 {
		height: 1rem;
		line-height: 1rem;
	}
</style>