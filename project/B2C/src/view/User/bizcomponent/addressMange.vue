<template>
	<div class="userMessage">
		<address-list :addressList = "addList"></address-list>
		<noData :goodnoshop="goodnoshop"></noData>
		<input @click="address" class="addAddress" type="button" value="添加收货地址" />
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import noData from 'component/noData';
	import addressList from './addressList';
	import { userAddressList } from 'common/path';
	export default {
		data(){
			return {
				'addList': [],
				'goodnoshop': {
					'show': true,
					'address':'添加收货地址',
					'link': '/addAddress/-1',
				}
			}
		},
		created(){
			const _that = this;
			Indicator.open({
			  	text: '加载中...',
			  	spinnerType: 'fading-circle'
			});
			this.$http.post(userAddressList)
		    .then(function (response) {
		    	Indicator.close();
		    	const data = response.data;
		    	if(data.success == 1000){
		    		const addressList = data.addressList
		    		_that.addList = addressList;
		    		_that.goodnoshop.show = false;
		    	}
		    	
		  	})
		  	.catch(function (error) {
		  		Indicator.close();
		    	
			});
		},
		methods: {
			address(){
				this.$store.dispatch('addAddrss');
				this.$router.push({name:'addAddress',params: {id: '-1'}});
			}
		},
		components:{
			noData,
			addressList,
		}
	}
</script>

<style scoped>
	.addAddress {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 10rem;
		height: 1.312rem;
		line-height: 1.312rem;
		text-align: center;
		background: #fc2a2e;
		color: #fff;
		border-radius: 0;
		font-size: 0.406rem;
	}
</style>