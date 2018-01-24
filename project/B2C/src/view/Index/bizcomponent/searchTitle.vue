<template>
	<div class="searchTitle">
		<h6 class="title">{{title.name}}</h6>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: {
			title: null
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
	.title {
		padding: 0.3rem 3%;
		color: #999999;
		font-weight: 500;
		font-size: 0.437rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
</style>