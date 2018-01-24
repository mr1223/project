<template>
	
	<div class="evaluateContent">
		<textarea @keyup="getLength" v-model="message.content" :placeholder="message.place"></textarea>
		<span class="contLength">{{contLength}}/200</span>
	</div>
	
</template>

<script>
	
	export default {
		data(){
			return {
				'contLength': 0,
			}
		},
		props: {
			message: {
				'content': '',
				'place': '',
			}
		},
		created(){
				
		},
		methods: {
			getLength(){
				if(this.message.content.length > 200){
					this.message.content = this.message.content.substring(0,200);
				}
				this.contLength = this.message.content.length;
			},
		},
		components:{
			
		}
	}
</script>

<style scoped>
	textarea {
		outline:none;
		resize:none;
	}
	.evaluateContent {
		position: relative;
		padding: 0 0.4rem;
		background: #fff;
	}
	.evaluateContent textarea {
		width: 8.4rem;
		height: 4.5rem;
		border-radius: 3px;
		background: #F7F7F7;
		padding: 0.4rem;
		padding-bottom: 0.7rem;
		color: #333;
		border: 0;
		word-break:break-all;
		font-size: 0.406rem;
	}
	.contLength {
		position: absolute;
		bottom: 0.7rem;
		right: 0.8rem;
		color: #999;
		font-size: 0.406rem;
	}
</style>