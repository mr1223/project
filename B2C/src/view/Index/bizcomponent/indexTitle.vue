<template>
	<div class="indexTitle">
		<h4>
			{{title.name}}
			<b></b>
		</h4>
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
	.indexTitle {
		padding-top: 0.1rem;
		padding-bottom: 0.41rem;
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		font-family: "PingFangSC-Medium","arial, helvetica, sans-serif";
		font-size: 0.437rem;
		text-align: center;
		background: #fff;
		margin-top: 0.218rem;
		color: #333333;
	}
	.indexTitle h4 {
		display: inline-block;
	}
	.indexTitle h4 b {
		display: block;
		margin: 0 auto;
		margin-top: -0.05rem;
		width: 50%;
		border-bottom: solid 0.0625rem #f00;
	}
</style>