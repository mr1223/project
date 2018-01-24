<template>
	<div class="goodsList">
		<shop :shop = "shop"></shop>
		<bottom></bottom>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import shop from 'component/shop';
	import bottom from 'component/bottom';
	import { wind } from 'common/public';
	import {goodList} from 'common/path';
	export default {
		data(){
			return {
				id: this.$route.params.id,
				uid: this.$route.params.uid,
				shop: [],
				currentPageForApp: 0,
				showCount: 10,
			}
		},
		created(){
		
			Indicator.open({
			  	text: '加载中...',
			  	spinnerType: 'fading-circle'
			});
			const _that = this;
			const obj = {
				currentPageForApp: _that.currentPageForApp,
		      	showCount: _that.showCount,
		      	id: _that.id,
		      	uid: _that.uid,
			}
			this.$http.post(goodList,wind.stringify(obj))
		    .then(function (response) {
		    	const data = response.data;
		    	if(data.success == 1000){
		    		const DpGoodsList = data.DpGoodsList
		    		_that.shop = _that.shop.concat(DpGoodsList);
		    		_that.currentPageForApp++;
		    		Indicator.close();
		    	}
		    	_that.ajaxStatus = true;
		  	})
		  	.catch(function (error) {
		  		_that.ajaxStatus = true;
		  		Indicator.close();
		    	console.log(error);
			});
		},
		components:{
			shop,
			bottom
		}
	}
</script>

<style scoped>
	.goodsList {
		padding-bottom: 70px;
	}
</style>