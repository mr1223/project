<template>
	<div class="goodOrder">
		<span :class="{'shop_car_avtive': shopCarSelect}" @click="shopCarShow(index)" class="shop_car">
			<i :class="{'icon-xuanzhong': shopCarSelect}" class="iconfont"></i>
		</span>
		<label>全选</label>
		<input @click="addOrder" class="goodPlace" type="button" value="下单" />
		<div class="goodOrderPice">
			<label>合计：</label>
			<span>￥{{count}}</span>
			<span>元</span>
		</div>
		<div style="clear: both;"></div>
	</div>
	
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				'avtive': true
			}
		},
		props:{
			title:null
		},
		computed: {
            ...mapState({
            	shopCarCont: state => state.shopCarCont,
            	shopCarSelect: state => state.shopCarSelect,
            	count: state => state.count,
            }),
            shopCarSelect:{
                // getter
                get: function () {
                    return this.$store.state.shopCarSelect;
                },
                // setter
                set: function (newValue) {
                    this.$store.state.shopCarSelect = newValue;
                }
            },
        },
        mounted(){
        	this.$store.dispatch('calculation');
        },
		methods: {
			shopCarShow(){
				
				if(this.shopCarSelect){
					this.shopCarSelect = false;
					this.setSelect(0);
				}else{
					this.shopCarSelect = true;
					this.setSelect(1);
				}
				this.$store.dispatch('calculation');
			},
			setSelect(e){
				const status = e ? true : false;
				for(var i = 0; i < this.shopCarCont.length; i++){
					this.shopCarCont[i]['avtive'] = status;
				}
			},
			addOrder(){
				//avtive
				const arr = [];
				for(var i = 0 ; i < this.shopCarCont.length; i++){
					if(this.shopCarCont[i]['avtive']){
						arr.push(this.shopCarCont[i]);
					}
				}
				this.$store.dispatch('setUpCarType',1);
				this.$store.dispatch('setUpShopCarBuy',arr);
				this.$router.push({name: 'goodBuy',params:{ id: 1 }});
			}
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.goodOrder {
		position: fixed;
		left: 0;
		bottom: 1.8125rem;
		z-index: 10;
		width: 100%;
		height: 1.4rem;
		line-height: 1.4rem;
		/*border-top: solid 1px #ccc;*/
		font-size: 0.406rem;
		background: #fff;
	}
	.goodOrder label {
		float: left;
		color: #999;
		margin-right: 0.1rem;
	}
	.goodOrderSelect {
		float: left;
	}
	.goodOrderPice {
		float: right;
		margin-right: 0.3rem;
		font-size: 0.406rem;
		color: #fc2a2e;
	}
	.goodOrderPice label {
		color: #fc2a2e;
	}
	.goodPlace {
		float: right;
		width: 3rem;
		height: 1.4rem;
		line-height: 1.4rem;
		color: #fff;
		font-size: 0.468rem;
		background: #fc2a2e;
		border-radius: 0;
	}
	.shop_car {
		float: left;
		margin: 0.45rem 0.2rem 0 0.4rem;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		text-align: center;
		line-height: 0.4rem;
		border: solid 0.032rem #999;
		
	}
	.shop_car_avtive {
		color: #fc2a2e;
		border: solid 0.032rem #fff;
	}
	.shop_car_avtive i {
		font-size: 0.5rem;
	}
</style>