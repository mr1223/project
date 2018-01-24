<template>
	<div class="goodBuyBtn">
		<span>合计：¥{{shopCarBuypice}}元</span>
		<input @click="addOrder" type="button" value="支付" />
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { wind } from 'common/public';
	import { shopOrderAddGoods,shopOrderAddShopcar } from 'common/path';
	export default {
		data(){
			return {
				
			}
		},
		computed: {
            ...mapState({
            	shopCarType: state => state.shopCarType,
            	shopCarBuypice: state => state.shopCarBuypice,
            	shopCarBuy: state => state.shopCarBuy,
            	shopCarBuyAddress: state => state.shopCarBuyAddress, 
            }),
        },
		created(){
				this.$store.dispatch('ShopCarBuyPice');
				console.log(this.$route.params);
		},
		methods: {
			addOrder(){
				const _that = this;
				console.log('shopCarType  '+ this.shopCarType);
				var addressId = this.shopCarBuyAddress.guid;
				if(this.$route.params.id == 2){
					var goodsId = this.shopCarBuy[0].guid;
					var num = this.shopCarBuy[0].goodsNum;
					var obj = {
						'goodsId': goodsId,
						'num': num,
						'addressId': addressId,
					}
					this.shopCarFirst(shopOrderAddGoods,wind.stringify(obj));
				}else
				if(this.$route.params.id == 1){
					var shopCars = '';
					if(this.shopCarBuy){
						for(var i = 0; i < this.shopCarBuy.length; i++){
							if(i == 0){
								shopCars = this.shopCarBuy[i]['guid'];
							}else{
								shopCars += "," + this.shopCarBuy[i]['guid'];
							}
							
						}
					}
					var obj = {
						'shopCars': shopCars,
						'addressId': addressId,
					}
					this.shopCarSend(shopOrderAddShopcar,wind.stringify(obj));
				}else
				if(this.$route.params.id == 3){
					//mainOrderNo
					console.log('66666');
					console.log('pay' + this.$route.params.mainOrderNo);
				}
				console.log(this.$route.params.id);
				
			},
			shopCarFirst(url,params){
				this.$http.post(url,params)
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		console.log(data);
			    	}
			    	
			  	})
			  	.catch(function (error) {
			  		
			    	console.log(error);
				});
			},
			shopCarSend(url,params){
				this.$http.post(url,params)
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		console.log(data);
			    	}
			    	
			  	})
			  	.catch(function (error) {
			  		
			    	console.log(error);
				});
			},
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.goodBuyBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
		font-size: 0.406rem;
		text-align: center;
	}
	.goodBuyBtn span {
		float: left;
		width: 45%;
		height: 1.312rem;
		line-height: 1.312rem;
		background: #fff;
		color: #FC2A2E;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.goodBuyBtn input {
		float: left;
		width: 55%;
		height: 1.312rem;
		line-height: 1.312rem;
		background: #FC2A2E;
		color: #fff;
		border-radius: 0;
	}
</style>