<template>
	<div class="loginOut">
		<input @click="loginOut" type="button" value="退出登录" />
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { loginShopOut } from 'common/path';
	export default {
		data(){
			return {
				
			}
		},
		created(){
			
		},
		methods: {
			loginOut(){
				const _that = this;
				this.$http.post(loginShopOut,{
					params: {
						
					}
				})
				.then(function(response){
					const data = response.data;
		    		if(data.success == 1000){
		    			Toast(data.msg);
		    			_that.$router.push('/');
		    		}
				})
				.catch(function(error){
					
				})
			}
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.loginOut {
		margin: 1rem 0;
	}
	.loginOut input {
		display: block;
		margin: 0 auto;
		width: 90%;
		height: 1.3rem;
		background: #fc2a2e;
		color: #fff;
		border: 0;
		border-radius: 2px;
		font-size: 0.437rem;
	}
</style>