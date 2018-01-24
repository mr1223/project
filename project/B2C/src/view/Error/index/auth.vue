<template>
	<div>
		授权认证中.......
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import qs from 'qs';
	import { Indicator } from 'mint-ui';
	import { wind } from 'common/public';
	import { loginCode } from 'common/path';
	import { local } from 'common/public';
	import { referer } from 'common/consts';
	export default {
		computed: {
            ...mapState({
            	navStatus: state => state.navStatus,
            }),
        },
		created(){
			Indicator.open({
			  	text: '权限认证中...',
			  	spinnerType: 'fading-circle'
			});
		},
		mounted(){
			
			const _that = this;
			const code = wind.getParam('code');
			const nav = local.get(referer);
			const obj = {
				code: code
			}
			//qsString
			this.$http.post(loginCode,wind.stringify(obj))
		    .then(function (response) {
		    	Indicator.close();
		    	const data = response.data;
		    	
		    	if(data.success == 1000){
		    		_that.$store.commit('INCREMENT', {
					  	navStatus: false
					})
		    		
		    		if(nav == 1){
		    			_that.$router.push({path: '/'});
		    		}else
		    		if(nav == 2){
		    			_that.$router.push({path: '/shopList'});
		    		}else
		    		if(nav == 3){
		    			_that.$router.push({path: '/user'});
		    		}
		    	}
		    	
		  	})
		  	.catch(function (error) {
		  		Indicator.close();
			});
			
		},
		
	}
</script>

<style>
</style>