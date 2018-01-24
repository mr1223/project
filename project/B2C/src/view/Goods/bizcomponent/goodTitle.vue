<template>
	<div class="goodTitle">
		<h5>{{title}}</h5>
	</div>
	
</template>

<script>
	export default {
		data(){
			return {}
		},
		props:{
			title:null
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.goodTitle h5 {
		padding: 0.2rem 0.4rem;
		font-weight: normal;
		color: #999999;
		font-size: 0.437rem;
		background: #fff;
		border-bottom: .032rem solid #f2f2f2;
	}
</style>