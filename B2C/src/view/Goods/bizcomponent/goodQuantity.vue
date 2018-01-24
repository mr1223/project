<template>
	<div class="goodQuantity">
		<i @click="shopSelectNo" class="iconfont_goodQuantity iconfont icon-chuyidong1-copy"></i>
		<div class="goodQuantityContent">
			<div class="goodQuantityImg">
				<img :src="ShopSelect.netUrl" />
			</div>
			<div class="goodQuantityCon">
				<p class="quantityConFirst">{{ShopSelect.goodName}}  {{ShopSelect.className}}</p>
				<p class="quantitySend">{{ShopSelect.goodNorm}}</p>
				<p class="quantityPrice">¥{{ShopSelect.currentPrice}}</p>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="Quantity">
			<label>数量</label>
			<div class="QuantityContent">
				<span @click="QuantityAdd">+</span>
				<input v-model="QuantityNumber" type="number" />
				<span @click="QuantityReduce">-</span>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="QuantityBtn">
			<input @click="QuantityBtn" type="button" value="确认" />
		</div>
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
				'QuantityNumber': 1
			}
		},
		computed: {
            ...mapState({
            	ShopSelect: state => state.ShopSelect,
            	shopCar: state => state.shopCar,
            	shopCarCont: state => state.shopCarCont,
            	shopCarType: state => state.shopCarType,
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
			shopSelectNo(){
				this.shopCar = false;
			},
			QuantityReduce(){
				if(this.QuantityNumber <= 1){
					this.QuantityNumber = 1;
					Toast({
						'message': '数量最少为1',
						'position': 'bottom',
						'className': 'toastIndex'
					});
				}else{
					this.QuantityNumber--;
				}
			},
			QuantityAdd(){
				this.QuantityNumber++;
			},
			QuantityBtn(){
				const _that = this;
				this.addShopCar();
				const obj = {
					goodsId: this.ShopSelect['guid'],
					goodsNum: this.QuantityNumber,
					operator: 'add',
				}
				if(this.shopCarType == 1){
					this.$http.post(shopCarModify,wind.stringify(obj))
				    .then(function (response) {
				    	_that.shopCar = false;
				    	const data = response.data;
				    	if(data.success == 1000){
							
							Toast('加入购物车成功');
				    	}
				    	
				  	})
				  	.catch(function (error) {
				  		_that.shopCar = false;
				    	console.log(error);
					});
				}else
				if(this.shopCarType == 2){
					this.shopCar = false;
					this.ShopSelect['goodsNum'] = this.QuantityNumber;
					const arr = [];
					arr.push(this.ShopSelect);
					this.$store.dispatch('setUpShopCarBuy',arr);
					this.$router.push({name: 'goodBuy',params:{ id: 2 }});
				}
				
				
			},
			addShopCar(){
				if(this.shopCarCont.length == 0){
					this.addShopCarList();
				}else{
					for(var i = 0 ; i < this.shopCarCont.length; i++){
						if(this.shopCarCont[i]['guid'] == this.ShopSelect['guid']){
							this.shopCarCont[i]['Number'] += this.QuantityNumber;
							this.ShopSelect['Number'] = this.shopCarCont[i]['Number'];
						}else{
							this.addShopCarList();
						}
					}
				}
				this.$store.commit('INCREMENT', {
				    shopCarCont: this.shopCarCont
				})
				this.$store.commit('INCREMENT', {
				    ShopSelect: this.ShopSelect
				})
			},
			addShopCarList(){
				this.ShopSelect.Number = this.QuantityNumber;
				this.shopCarCont.push(this.ShopSelect);
			}
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.goodQuantity {
		position: relative;
		width: 100%;
		padding-top: 0.8rem;
		background: #fff;
		box-shadow: 0 -1px 1px #888;
	}
	.iconfont_goodQuantity {
		position: absolute;
		right: 0.2rem;
	    top: -0.1rem;
	    font-size: 0.8rem;
		color: #999;
	}
	.goodQuantityContent {
		width: 10rem;
		padding-bottom: 0.5rem;
		margin: 0 auto;
		border-bottom: .032rem solid #E6E6E6;
	}
	.goodQuantityImg {
		margin-left: 0.4rem;
		float: left;
		width: 2.8rem;
		height: 2.8rem;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
	}
	.goodQuantityImg img {
		max-width: 100%;
		max-height: 100%;
		vertical-align: middle;
	}
	.goodQuantityCon {
		float: left;
		margin-left: 0.4rem;
		width: 5.4rem;
	}
	.goodQuantityCon p {
		height: 0.812rem;
		line-height: 0.812rem;
		font-size: 0.437rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
		overflow: hidden;
	}
	.goodQuantityCon .quantityConFirst {
		font-size: 0.468rem;
		color: #333;
		font-weight: 600;
	}
	.goodQuantityCon .quantitySend {
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
	}
	.goodQuantityCon .quantityPrice {
		font-size: 0.468rem;
		color: #FC2A2E;
		font-weight: 600;
	}
	.Quantity {
		padding-left: 0.5rem;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		font-size: 0.437rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.Quantity label {
		float: left;
		color: #A3A3A3;
	}
	.QuantityContent {
		float: right;
		margin-right: 0.5rem;
	}
	.QuantityContent span {
		float: right;
		width: 0.8rem;
		height: 0.8rem;
		text-align: center;
		line-height: 0.8rem;
		border: .032rem solid #E6E6E6;
	}
	.QuantityContent input {
		float: right;
		width: 1.5rem;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		box-shadow: 0;
		border-radius: 0;
		border: 0; /* 方法1 */
    	-webkit-appearance: none; /* 方法2 */
		border-top: .032rem solid #E6E6E6;
		border-bottom: .032rem solid #E6E6E6;
		
	}
	.QuantityBtn input {
		width: 100%;
		height: 1.312rem;
		line-height: 1.312rem;
		text-align: center;
		border: 0;
		border-radius: 0;
		background: #fc2a2e;
		font-size: 0.437rem;
		color: #fff;
	}
	.toastIndex {
		z-index: 3000;
	}
</style>