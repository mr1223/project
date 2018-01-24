<template>
	<div class="square">
		<ul>
			<li v-for="(tode,index) in square" :class="{'active': 'tr'}">
				<router-link :to="{name:'goods',params: {id: index+1}}">{{tode.className}}</router-link>
			</li>
			<div style="clear: both;"></div>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: {
			square:null
		}
	}
</script>

<style scoped="">
	.square {
		padding-bottom: 0.18rem;
		background: #fff;
	}
	.square ul {
		width: 97%;
		margin-left: 3%;
		font-size: 0.437rem;
	}
	.square ul li {
		float: left;
		margin-bottom: 0.3125rem;
		width: 25%;
		height: 0.8125rem;
		line-height: 0.8125rem;
		text-align: center;
	}
	.square ul li a {
		display: block;
		width: 87%;
		border-radius: 0.0625rem;
		border: 0;
		border: solid 0.0312rem #BDBDBD;
		color: #333333;
	}
	.square ul .active {
		border-right: 0;
	}
	
</style>