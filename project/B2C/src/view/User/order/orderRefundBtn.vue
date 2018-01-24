<template>
	<div class="evaluate_btn">
		<a @click="btn" class="evaluate_submit">提交</a>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				
			}
		},
		
		created(){
				
		},
		methods: {
			btn(){
				this.$emit('submit');
			}
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.evaluate_submit {
		position: fixed;
		bottom: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 1.312rem;
		line-height: 1.312rem;
		text-align: center;
		background: #FC2A2E;
		color: #fff;
		font-size: 0.406rem;
	}
</style>