<template>
	<div class="orderContent">
		<div class="ProceContent">
			{{ProceContent}}
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				
			}
		},
		props: {
			'ProceContent': null,
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
	.ProceContent {
		padding: 0 0.5rem;
		padding-bottom: 0.4rem;
		font-size: 0.375rem;
		color: #666;
		background: #fff;
		border-bottom: solid 1px #F5F5F5;
	}
	
</style>