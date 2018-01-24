<template>
	<div class="goodDetail">
		<div class="goodDetail_img">
			<img :src="shopDetail.netUrl" />
		</div>
		<div class="goodDetail_goodName">
			{{shopDetail.goodName}} {{shopDetail.className}}
		</div>
		<div class="goodDetail_goodNorm">
			{{shopDetail.goodNorm}}
		</div>
		<div class="goodDetail_Price">
			¥{{shopDetail.currentPrice}}
		</div>
		<div class="shop_evaluate_cont">
			<shop-title :title="title"></shop-title>
			<shop-user-message :key="tode" v-for="(tode,index) in evaluations" :message="tode"></shop-user-message>
			<div class="shop_evaluate_content">
				<router-link :to="{name:'goodEvaluate',params:{id: shopID}}">
					<span class="shop_evaluate_look">查看全部评价</span>
				</router-link>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="Detail">
			<shop-title :title="detail"></shop-title>
			<div class="Detail_img">
				<img :src="shopDetail.netUrl" />
			</div>
			<p class="Detail_content">
				{{shopDetail.content}}
			</p>
		</div>
		<good-purchase></good-purchase>
		<mt-popup v-model="shopCar" position="bottom" class="mint-popup-4">  
          	<good-quantity></good-quantity>
        </mt-popup>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import { Indicator,Popup } from 'mint-ui';
	import { wind } from 'common/public';
	import { goodDetailApi,evaluationList } from 'common/path';
	import goodQuantity from 'view/Goods/bizcomponent/goodQuantity';
	import goodPurchase from './goodPurchase';
	import shopTitle from './shopTitle';
	import shopUserMessage from './shopUserMessage';
	export default {
		data(){
			return {
				'shopID': this.$route.params.id,
				'shopDetail': {},//商品信息
				'title': '商品评价',
				'detail': '商品详情',
				'currentPageForApp': 1,
				'showCount': 1,
				'evaluations': [],//评价信息
			}
		},
		computed: {
            ...mapState({
            	ShopSelect: state => state.ShopSelect,
            	shopCar: state => state.shopCar,
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
			this.creat();
		},
		methods: {
			creat(){
				Indicator.open({
				  	text: '加载中...',
				  	spinnerType: 'fading-circle'
				});
				const _that = this;
				const obj = {
					dpGoodsId: _that.shopID,
				}
				console.log(_that.shopID);
				//请求商品信息
				this.$http.post(goodDetailApi,wind.stringify(obj))
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		const DpGoodsList = data.DpGoodsDetail
			    		_that.shopDetail = DpGoodsList;
			    		_that.$store.commit('INCREMENT', {
						    ShopSelect: DpGoodsList
						})
			    		Indicator.close();
			    	}
			    	
			  	})
			  	.catch(function (error) {
			  		Indicator.close();
			    	console.log(error);
				});
				//请求评价信息
				const evaluation = {
					'currentPageForApp': this.currentPageForApp,
					'showCount': this.showCount,
					'goodsId': this.shopID,
				}
				this.$http.post(evaluationList,wind.stringify(evaluation))
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		_that.evaluations = data.evaluations;
			    		console.log(data);
			    	}
			    	
			  	})
			  	.catch(function (error) {
			  		Indicator.close();
			    	console.log(error);
				});
			}
		},
		components: {
			goodPurchase,
			mtPopup: Popup,
			goodQuantity,
			shopTitle,
			shopUserMessage,
		}
	}
</script>

<style scoped>
	.goodDetail {
		width: 100%;
		font-size: 0.468rem;
		color: #333;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.goodDetail_img {
		position: relative;
		width: 10rem;
		height: 200px;
		text-align: center;
		background: #fff;
	}
	.goodDetail_img img {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		max-width: 10rem;
	}
	.Detail_img {
		display: table-cell;
		padding-top: 0.4rem;
		width: 10rem;
		vertical-align: middle;
		text-align: center;
	}
	.Detail_img img {
		max-width: 10rem;
		margin: 0 auto;
		vertical-align:middle;
	}
	.goodDetail_goodName {
		padding: 0 0.5rem;
		padding-top: 0.5rem;
		height: 0.812rem;
		line-height: 0.812rem;
		font-weight: 600;
		overflow: hidden;
		background: #fff;
	}
	.goodDetail_goodNorm {
		padding: 0 0.5rem;
		padding-top: 0.1rem;
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
		padding: 0 0.5rem;
		padding-bottom: 0.5rem;
		font-size: 0.468rem;
		color: #FC2A2E;
		font-weight: 600;
		background: #fff;
	}
	.Detail_content {
		
	}
	.shop_evaluate_look {
		display: block;
		margin: 0 auto;
		width: 80%;
		height: 1rem;
		line-height: 1rem;
		border-radius: 0.6rem;
		text-align: center;
		border: solid 1px #888888;
	}
	.shop_evaluate_img {
		float: left;
		margin-left: 0.5rem;
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.shop_evaluate_img img {
		max-width: 100%;
		max-height: 100%;
	}
	.mint-popup-bottom {
		width: 100%;
	}
	.shop_evaluate_cont {
		margin-top: 0.218rem;
		width: 100%;
		background: #fff;
	}
	.Detail {
		margin-top: 0.218rem;
		width: 100%;
		background: #fff;
	} 
	.Detail_content {
		display: block;
		padding: 0.4rem 0.5rem;
		color: #666;
		font-size: 0.437rem;
		overflow: hidden;
	}
	.shop_evaluate_content {
		padding: 0.4rem 0;
		border-top: solid 0.032rem #f2f2f2;
	}
	.shop_evaluate_look {
		display: block;
		margin: 0 auto;
		width: 4.2rem;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		border: solid 0.032rem #BDBDBD;
		border-radius: 0.062rem;
		color: #999999;
		font-size: 0.403rem;
	}
</style>