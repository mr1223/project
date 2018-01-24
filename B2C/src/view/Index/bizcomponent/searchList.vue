<template>
	<div class="searchList">
		<div v-for="(tode,index) in list" class="list">
			<router-link :to="{name:'goodDetail',params: {id: tode.goodsId}}">
				<span class="listImgCont">
					<img :src="tode.netUrl" />
				</span>
			</router-link>
			<div class="searchListCon">
				<router-link :to="{name:'goodDetail',params: {id: tode.goodsId}}">
					<p class="goodDetail_goodName">
						{{tode.goodName}}
					</p>
					<p class="goodDetail_goodNorm">
						{{tode.goodNorm}}
					</p>
				</router-link>
				<p class="goodDetail_Price">
					¥{{tode.buycount}}
				</p>
			</div>
			<span @click="shopCarShow(index)" class="shop_car">
				<i class="iconfont icon-gouwuche1"></i>
			</span>
			<div style="clear: both;"></div>
		</div>
		<mt-popup v-model="shopCar" position="bottom" class="mint-popup-4">  
          	<good-quantity></good-quantity>
        </mt-popup>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { Popup } from 'mint-ui';
	import goodQuantity from 'view/Goods/bizcomponent/goodQuantity';
	export default {
		data(){
			return {
				
			}
		},
		props: {
			list: null
		},
		computed: {
            ...mapState({
            	shopCar: state => state.shopCar,
            	ShopSelect: state => state.ShopSelect,
            }),
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
			shopCarShow(event){
				const data = this.list[event];
				data['guid'] = data['goodsId'];
				this.$store.commit('INCREMENT', {
				    shopCar: true
				})
				this.$store.commit('INCREMENT', {
				    ShopSelect: data
				})
				this.$store.dispatch('setUpCarType',1);
			}
		},
		components:{
			goodQuantity,
			mtPopup: Popup,
		}
	}
</script>

<style scoped>
	.searchList {
		background: #fff;
	}
	.list {
		position: relative;
		padding: 0.4rem;
		margin: 0 auto;
		border-bottom: solid 0.032rem #F2F2F2;
	}
	.listImgCont {
		display: table-cell;
		float: left;
		width: 2.5rem;
		height: 2.5rem;
		text-align: center;
		vertical-align: middle;
	}
	.listImgCont img {
		max-width: 100%;
		max-height: 100%;
		vertical-align: middle;
	}
	.searchListCon {
		float: left;
		padding-left: 0.2rem;
		width: 6rem;
	}
	.goodDetail_goodName {
		height: 0.812rem;
		line-height: 0.812rem;
		font-weight: 600;
		overflow: hidden;
		background: #fff;
		font-size: 0.468rem;
		color: #333;
	}
	.goodDetail_goodNorm {
		height: 1rem;
		line-height: 0.5rem;
		font-size: 0.406rem;
		color: #999;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		word-break: break-all;
		overflow: hidden;
		background: #fff;
	}
	.goodDetail_Price {
		margin-top: 0.1rem;
		font-size: 0.468rem;
		color: #FC2A2E;
		font-weight: 600;
		background: #fff;
	}
	.shop_car {
		position: absolute;
		right: 0.4rem;
		bottom: 0.32rem;
		display: inline-block;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		border: solid 0.032rem #f2f2f2;
		text-align: center;
		line-height: 0.8rem;
		color: #fc2a2e;
	}
</style>