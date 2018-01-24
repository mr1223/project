<template>
	<div class="goodCarList">
		<mt-cell-swipe :key="tode" ref="CellSwipe" @click.native="swipeMove()" :right="[
	    {
	      content: '删除',
	      style: { background: 'red', color: '#fff',
	      	height: '1.1rem',lineHeight: '1.1rem',
	      	fontSize: '0.406rem',width: '1.5rem',
	      	textAlign: 'center'
	       },
	      handler: () => leftButtonHandler(index)
	    }
  	]" v-for="(tode,index) in shopCarCont"> 
			<div class="list" disabled="">
				<span :class="{'shop_car_avtive': tode.avtive}" @click="shopCarShow(index)" class="shop_car">
					<i :class="{'icon-xuanzhong': tode.avtive}" class="iconfont"></i>
				</span>
				<router-link :to="{name:'goodDetail',params: {id: tode.guid}}">
					<span class="listImgCont">
						<img :src="tode.netUrl" />
					</span>
				</router-link>
				<div class="searchListCon">
					<router-link :to="{name:'goodDetail',params: {id: tode.guid}}">
						<p class="goodDetail_goodName">
							{{tode.goodName}}
						</p>
						<p class="goodDetail_goodNorm">
							{{tode.goodNorm}}
						</p>
					</router-link>
					<p :title="'¥'+tode.currentPrice" class="goodDetail_Price">
						¥{{tode.currentPrice}}
					</p>
					<div class="QuantityContent">
						<span @click="QuantityAdd(index)">+</span>
						<input @blur="QuantityChange(index)" v-model="tode.goodsNum" type="number" />
						<span @click="QuantityReduce(index)">-</span>
					</div>
					<div style="clear: both;"></div>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div style="clear: both;"></div>
		</mt-cell-swipe>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { Toast,MessageBox,CellSwipe } from 'mint-ui';
	import { wind } from 'common/public';
	import { shopCarModify,shopCarDel } from 'common/path';
	export default {
		data(){
			return {
				value: 0,
			}
		},
		props: {
			
		},
		computed: {
            ...mapState({
            	shopCarCont: state => state.shopCarCont,
            	shopCarSelect: state => state.shopCarSelect,
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
		created(){
			
		},
		methods: {
			swipeMove(){
				
			},
			leftButtonHandler(event) { 
				const _that = this;
				const data = this.shopCarCont[event];
				const obj = {
					shopCarId: this.shopCarCont[event]['guid'],
					//goodsId: this.shopCarCont[event]['goodsId'],
				}
				this.$http.post(shopCarDel,wind.stringify(obj))
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		_that.shopCarCont.splice(event,1);
						Toast('删除成功!');
			    	}
			  	})
			  	.catch(function (error) {
			    	console.log(error);
				});
		    }, 
			shopCarShow(event){
				const data = this.shopCarCont[event];
				if(data.goodStatus == 0){
					Toast('此商品暂未上架');
					return;
				}
				if(data.goodStatus == 2){
					Toast('此商品已售完');
					return;
				}
				if(!data.avtive && data.goodStatus == 1){
					this.shopCarCont[event].avtive = true;
				}else{
					this.shopCarCont[event].avtive = false;
				}
				this.$store.dispatch('calculation');
			},
			QuantityChange(event){
				if(this.shopCarCont[event].goodsNum < 1){
					this.shopCarCont[event].goodsNum = 1;
					Toast({
						'message': '数量最少为1',
					});
					return;
				}
				this.$store.dispatch('calculation');
				this.edit(event);
			},
			QuantityAdd(event){
				this.shopCarCont[event].goodsNum++;
				this.$store.dispatch('calculation');
				this.edit(event);
			}, 
			QuantityReduce(event){
				if(this.shopCarCont[event].goodsNum < 1){
					this.shopCarCont[event].goodsNum = 1;
					Toast({
						'message': '数量最少为1',
						'position': 'bottom',
						'className': 'toastIndex'
					});
				}else{
					this.shopCarCont[event].goodsNum--;
					this.edit(event);
				}
				this.$store.dispatch('calculation');
			},
			edit(event){
				const _that = this;
				const obj = {
					shopCarId: this.shopCarCont[event]['guid'],
					goodsId: this.shopCarCont[event]['goodsId'],
					goodsNum: this.shopCarCont[event]['goodsNum'],
					operator: 'add',
				}
				this.$http.post(shopCarModify,wind.stringify(obj))
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
						Toast('购物车编辑成功');
			    	}
			  	})
			  	.catch(function (error) {
			    	console.log(error);
				});
			},
			
		},
		components:{
			mtCellSwipe: CellSwipe,
		}
	}
</script>

<style scoped>
	.goodCarList {
		background: #fff;
	}
	.list {
		position: relative;
		padding: 0.4rem 0;
		margin: 0 auto;
		/*border-bottom: solid 0.032rem #F2F2F2;*/
		background: #fff;
	}
	.shop_car {
		float: left;
		margin: 1rem 0.2rem 0 0.1rem;
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
		width: 5.8rem;
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
		width: 2.6rem;
		margin-top: 0.1rem;
		font-size: 0.403rem;
		color: #FC2A2E;
		font-weight: 600;
		background: #fff;
		overflow: hidden;
	}
	.QuantityContent {
		float: right;
		position: absolute;
		top: 2.2rem;
		right: 0.1rem;
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
		width: 1.2rem;
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
</style>