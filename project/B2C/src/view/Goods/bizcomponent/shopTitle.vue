<template>
	<div class="shopTitle">
		<span></span>{{title}}
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
			title: null
		},
		computed: {
            
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
	.shopTitle {
		position: relative;
		padding-left: 0.5rem;
		height: 1.312rem;
		line-height: 1.312rem;
		border-bottom: solid 0.032rem #F2F2F2;
		color: #333333;
		font-weight: 600;
		font-size: 0.437rem;
		background: #fff;
	}
	.shopTitle span {
		position: absolute;
		top: 0.4rem;
		left: 0.3rem;
		display: inline-block;
		width: 0.093rem;
		height: 0.5rem;
		background: #FC2A2E;
	}
</style>