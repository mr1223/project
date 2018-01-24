<template>
	<div class="goodPurchase">
		<button class="shopCarShow" @click="shopCarShow">加入购物车</button>
		<button class="shopCarBuy" @click="shopCarBuy">立即购买</button>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import { Toast } from 'mint-ui';
	import { wind } from 'common/public';
	import { shopCarModify } from 'common/path';
	export default {
		data(){
			return {
				
			}
		},
		props:{
			
		},
		computed: {
            ...mapState({
            	shopCar: state => state.shopCar,
            	shopCarType: state => state.shopCarType,
            }),
            shopCarType:{
                // getter
                get: function () {
                    return this.$store.state.shopCarType;
                },
                // setter
                set: function (newValue) {
                    this.$store.state.shopCarType = newValue;
                }
            },
            shopCar:{
                // getter
                get: function () {
                    return this.$store.state.shopCar;
                },
                // setter
                set: function (newValue) {
                    this.$store.state.shopCar = newValue;
                }
            },
        },
		created(){
			
		},
		methods: {
			shopCarShow(){
				this.$store.commit('INCREMENT', {
				    shopCar: true
				})
				this.$store.dispatch('setUpCarType',1);
			},
			shopCarBuy(){
				this.$store.commit('INCREMENT', {
				    shopCar: true
				})
				this.$store.dispatch('setUpCarType',2);
			}
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.goodPurchase {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.goodPurchase button {
		float: left;
		width: 50%;
		height: 1.312rem;
		line-height: 1.312rem;
		text-align: center;
		font-size: 0.437rem;
		border: 0;
	}
	.shopCarShow {
		background: #fff;
		color: #FC2A2E;
	}
	.shopCarBuy {
		background: #FC2A2E;
		color: #fff;
	}
</style>