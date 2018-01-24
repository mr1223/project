<template>
	<div class="busiImage">
		<img :src="neturl" />
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: {
			'neturl': null
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
	.busiImage {
		padding: 0.4rem;
		min-height: 18rem;
		background: #fff;
	}
	.busiImage img {
		max-width: 100%;
	}
</style>