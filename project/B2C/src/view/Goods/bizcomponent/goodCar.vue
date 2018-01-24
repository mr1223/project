<template>
	<div class="goodCar">
		
		<good-car-list></good-car-list>
		<!--<div class="content">
			<div class="shop_list" v-for="tode in shopCarCont">
				<input class="shop_checkbox" type="checkbox" />
				<goodcontent :content="tode"></goodcontent>
				<div class="shop_number">
					<span>-</span>
					<input type="number" />
					<span>+</span>
				</div>
				<div style="clear: both;"></div>
			</div>
		</div>-->
		<noData :goodnoshop="goodnoshop"></noData>
		<goodOrder></goodOrder>
		<bottom></bottom>
	</div>
	
</template>

<script>
	import { mapState } from 'vuex';
	import bottom from 'component/bottom';
	import noData from 'component/noData';
	import goodCarList from './goodCarList';
	import goodcontent from './goodContent';
	import goodOrder from './goodOrder';
	import { shopCarList } from 'common/path';
	export default {
		data(){
			return {
				'title': '购物车',
				'shopList':[
					{
						'netUrl': require('../../../static/image/explem.png')
					},
					{
						'netUrl': require('../../../static/image/explem.png')
					},
				],
				'goodnoshop': {
					'describe':'购物车为空',
					'show': true,
				},
				
			}
		},
		computed: {
            ...mapState({
            	shopCarCont: state => state.shopCarCont,
            }),
        },
		created(){
			const _that = this;
			//菜单
			this.$store.commit('INCREMENT', {
			    navIndex: 3
			})
			//请求数据
			//,wind.stringify(obj)
			this.$http.post(shopCarList)
		    .then(function (response) {
		    	const data = response.data;
		    	if(data.success == 1000){
		    		const DpShopCars = data.DpShopCars;
					_that.goodnoshop.show = false;
					for(var i=0;i < DpShopCars.length; i++){
						if(DpShopCars[i]['goodStatus'] == 1){
							DpShopCars[i]['avtive'] = true;
						}else{
							DpShopCars[i]['avtive'] = false;
						}
					}
					_that.$store.commit('INCREMENT', {
					    shopCarCont: DpShopCars
					})
					_that.$store.dispatch('calculation');
		    	}
		    	
		  	})
		  	.catch(function (error) {
		    	console.log(error);
			});
			
		},
		components:{
			bottom,
			goodcontent,
			goodCarList,
			noData,
			goodOrder,
		}
	}
</script>

<style scoped>
	.goodCar {
		padding-bottom: 1rem;
	}
	.content {
		padding-bottom: 70px;
	}
	.shop_list {
		position: relative;
		margin: 0 auto;
		padding-top: 0.218rem;
		width: 94%;
		border-bottom: solid 1px #ccc;
	}
	.shop_checkbox {
		float: left;
	}
	.shop_gouwuche {
		position: absolute;
		right: 0.125rem;
		bottom: 0.2rem;
		font-size: 0.8rem;
		color: #fc2a2e;
	}
	.shop_number {
		position: absolute;
		right: 0.125rem;
		bottom: 0.2rem;
		font-size: 0.8rem;
	}
	.shop_number input {
		width: 1rem;
	}
</style>