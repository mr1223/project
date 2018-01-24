<template>
	<div class="shop">
		<div :class="{shop_con_active: index%2 == 0}" class="shop_con" v-for="(tode,index) in shop">
			<router-link :to="{name:'goodDetail',params: {id: tode.guid}}">
				<div class="shop_img_content">
					<img class="shop_img" :src="tode.netUrl" />
				</div>
				<div class="shop_content">
					<span>{{tode.goodName}}</span>
					<span>{{tode.className}}</span>
				</div>
			</router-link>
			<p class="shop_goodNorm">{{tode.goodNorm}}</p>
			<p class="shop_currentPrice">¥{{tode.currentPrice}}</p>
			<span @click="shopCarShow(index)" class="shop_car">
				<i class="iconfont icon-gouwuche1"></i>
			</span>
			<div style="clear: both;"></div>
			
		</div>
		<div style="clear: both;"></div>
		
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				'bottomPullText': '上拉刷新'
			}
		},
		props:{
			shop:null,
			bgcolor: null
		},
		computed: {
            ...mapState({
            	shopCar: state => state.shopCar,
            	ShopSelect: state => state.ShopSelect,
            }),
        },
		methods:{
			shopCarShow(event){
				const data = this.shop[event];
				this.$store.commit('INCREMENT', {
				    shopCar: true
				})
				this.$store.commit('INCREMENT', {
				    ShopSelect: data
				})
			}
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.shop {
		background: #fff;
	}
	.shop_con {
		position: relative;
		float: left;
		width: 4.2rem;
		padding: 0.3125rem 0.392rem;
		border-bottom: solid 0.032rem #F2F2F2;
	}
	.shop_con_active {
		border-right: solid 0.032rem #F2F2F2;
	} 
	.shop_con a {
		display: block;
		width: 4.2rem;
		text-align: center;
	}
	.shop_img_content {
		display: table-cell;
		width: 4.2rem;
		height: 4.2rem;
		vertical-align: middle;
		text-align: center;
	}
	.shop_img {
		max-width: 100%;
		max-height: 100%;
		vertical-align:middle;
	}
	.shop_content {
		margin-top: 0.4rem;
		font-size: 0.468rem;
		font-weight: 500;
		color: #333;
		text-align: left;
	}
	.shop_goodNorm {
		margin-top: 0.15rem;
		font-size: 0.375rem;
		color: #999;
	}
	.shop_currentPrice {
		margin-top: 0.15rem;
		font-size: 0.5rem;
		color: #FC2A2E;
		font-weight: 600;
	}
	.shop_car {
		position: absolute;
		right: 0.2rem;
		bottom: 0.2rem;
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