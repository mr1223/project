<template>
	<div class="goodEvaluateImage">
		<div class="ImageContent" v-for="(tode,index) in Image">
			<img :src="tode" />
		</div>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: {
			Image: null
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
	.goodEvaluateImage {
		padding: 0 0.2rem;
		padding-bottom: 0.5rem;
	}
	.ImageContent {
		float: left;
		width: 2.92rem;
		margin-left: 0.2rem;
		margin-top: 0.2rem;
	}
	.ImageContent img {
		display: table-cell;
		max-width: 100%;
		max-height: 100%;
		text-align: center;
		vertical-align: middle;
	}
</style>