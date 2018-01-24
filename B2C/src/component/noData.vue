<template>
	<div v-if="goodnoshop.show" class="noData">
		<div class="no_content">
			<i class="no_content_icon iconfont icon-kongyemian"></i>
			<p class="describe" v-if="goodnoshop.describe">{{goodnoshop.describe}}</p>
			<router-link :to="goodnoshop.link" v-if="goodnoshop.address">
				<button class="address">{{goodnoshop.address}}</button>
			</router-link>
		</div>
	</div>
	
</template>

<script>
	export default {
		data(){
			return {}
		},
		props:{
			goodnoshop:null
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.noData {
		padding: 4em 0;
		padding-bottom: 6rem;
		background: #fff;
	}
	.no_content {
		text-align: center;
	}
	.no_content_icon {
		font-size: 2rem;
		color: #fc2a2e;
	}
	.describe {
		font-size: 0.437rem;
		color: #666;
	}
	.address {
		display: block;
		margin: 0 auto;
		width: 50%;
		height: 1.062rem;
		border: solid 1px #FC2A2E;
		background: none;
		color: #FC2A2E;
		border-radius: 0.062rem;
	}
</style>