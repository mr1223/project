<template>
	<div class="searchList">
		<div class="listContent" v-for="(tode,index) in list">
			<div class="list" v-for="(tod,indexs) in tode.orderDetail">
				<router-link :to="{name:'goodOrderDetail',params: {id: tode.mainOrderNo}}">
					<span class="listImgCont">
						<img :src="tod.netUrl" />
					</span>
				</router-link>
				<div class="searchListCon">
					<router-link :to="{name:'goodOrderDetail',params: {id: tode.mainOrderNo}}">
						<p class="goodDetail_goodName">
							{{tod.goodName}} {{tod.className}}
						</p>
						<p class="goodDetail_goodNorm">
							{{tod.goodNorm}}
						</p>
					</router-link>
					<p class="goodDetail_Price">
						¥{{tod.childOrderPrice}}
					</p>
				</div>
				<span class="goodBuyNumber">x{{tod.orderNum}}</span>
				<div>
					
				</div>
				<div>
					<div v-if="tod.childOrderStatus == 1">
						<span class="goodBuyStatus">买家未付款</span>
					</div>
					<div v-if="tod.childOrderStatus == 2">
						<span class="goodBuyStatus" v-if="tod.logisticsStatus == 1">卖家未发货</span>
						<span class="goodBuyStatus" v-if="tod.logisticsStatus == 2">卖家已发货</span>
						<span class="goodBuyStatus" v-if="tod.logisticsStatus == 3">交易成功</span>
						<!--<span class="goodBuyStatus" v-if="tod.logisticsStatus == 4">卖家已发货</span>-->
					</div>
					<div v-if="tod.childOrderStatus == 3">
						<span class="goodBuyStatus">买家支付未成功</span>
					</div>
					<div v-if="tod.childOrderStatus == 4">
						<span class="goodBuyStatus">买家支付未成功</span>
					</div>
					<div v-if="tod.childOrderStatus == 买家取消支付">
						<span class="goodBuyStatus">买家支付未成功</span>
					</div>
					<div v-if="tod.childOrderStatus == 5">
						<span class="goodBuyStatus">买家取消订单</span>
					</div>
					<div v-if="tod.childOrderStatus == 6">
						<span class="goodBuyStatus">订单已过期</span>
					</div>
					<div v-if="tod.childOrderStatus == 7">
						<span class="goodBuyStatus" v-if="!tod.logisticsStatus == 4">已退款</span>
						<span class="goodBuyStatus" v-if="tod.logisticsStatus == 4">已退货</span>
					</div>
					<div v-if="tod.childOrderStatus == 8">
						<span class="goodBuyStatus">交易关闭</span>
					</div>
					<div v-if="tod.childOrderStatus == 9">
						<span class="goodBuyStatus">交易完成</span>
					</div>
				</div>
				<!--<span class="goodBuyStatus" v-if="tod.childOrderStatus == 0">订单已删除</span>
				<span class="goodBuyStatus" v-if="tod.childOrderStatus == 1">买家未付款</span>
				<span class="goodBuyStatus" v-if="tod.childOrderStatus == 2">买家已付款</span>
				<span class="goodBuyStatus" v-if="tod.childOrderStatus == 3">买家支付未成功</span>
				<span class="goodBuyStatus" v-if="tod.childOrderStatus == 4">买家取消支付</span>
				<span class="goodBuyStatus" v-if="tod.childOrderStatus == 5">买家取消订单</span>
				<span class="goodBuyStatus" v-if="tod.childOrderStatus == 6">订单已过期</span>
				<span class="goodBuyStatus" v-if="tod.childOrderStatus == 7">已退款</span>
				<span class="goodBuyStatus" v-if="tod.childOrderStatus == 8">交易关闭</span>
				<span class="goodBuyStatus" v-if="tod.childOrderStatus == 9">交易完成</span>-->
				<div style="clear: both;"></div>
			</div>
			<div class="orderStatus">
				<ul>
					<li v-if="tode.orderStauts == 1">
						<a @click="goPay(index)" class="orderStatusList active">立即支付</a>
						<a @click="cacelPay(index)" class="orderStatusList">取消支付</a>
						<div style="clear: both;"></div>
					</li>
					<li v-if="tode.orderStauts == 2">
						<a v-if="tode.logisticsStatus == 1" class="orderStatusList active">提醒发货</a>
						<a @click="confirReceipt(tode.mainOrderNo,index)" v-if="tode.logisticsStatus == 2" class="orderStatusList active">确认收货</a>
						<a @click="orderEvaluate(tode.mainOrderNo,index)" v-if="tode.logisticsStatus == 3" class="orderStatusList active">评价</a>
						<a @click="refund(tode.mainOrderNo)" class="orderStatusList">申请退款</a>
						<div style="clear: both;"></div>
					</li>
					<li v-if="tode.orderStauts == 3 || tode.orderStauts == 4 || tode.orderStauts == 5 || tode.orderStauts == 6 || tode.orderStauts == 8|| tode.orderStauts == 9">
						<a @click="removeOrder(tode.mainOrderNo,index)" class="orderStatusList">删除订单</a>
						<div style="clear: both;"></div>
					</li>
					<div style="clear: both;"></div>
				</ul>
				<div class="orderStatusListCont"  v-if="tode.orderStauts == 7">
					<label>退款成功</label>
					<span>退款金额：¥1222.99</span>
					<div style="clear: both;"></div>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div style="clear: both;"></div>
		</div>
		
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { MessageBox } from 'mint-ui';
	import { shopOrderReceive,shopOrderDelete } from 'common/path';
	import { wind } from 'common/public';
	export default {
		data(){
			return {
				status: [
					{
						'type': 1
					},
					{
						'type': 2
					}
				]
			}
		},
		props: {
			list: null
		},
		computed: {
            ...mapState({
            	order: state => state.order,
            }),
        },
		created(){
			
		},
		methods: {
			cacelPay(event){
				MessageBox.confirm('',{
					title: '提示',
					message : '确认取消该订单吗？',
					confirmButtonClass : 'messActive',
					cancelButtonClass: 'cancelMessActive',
				})
				.then(action => {
					const obj = {
						guid: guid
					}
				  	this.$http.post(addressRemove,wind.stringify(obj))
				    .then(function (response) {
				    	const data = response.data;
				    	if(data.success == 1000){
				    		_that.removeAddress(event);
				    	}
				    	
				  	})
				  	.catch(function (error) {
				    	
					});
				  
				  
				  
				},() => {
					
				})
			},
			confirReceipt(e){
				const _that = this;
				MessageBox.confirm('',{
					title: '提示',
					message : '请确认您的货品已收到？',
					confirmButtonClass : 'messActive',
					cancelButtonClass: 'cancelMessActive',
				})
				.then(action => {
					const obj = {
						mainOrderNo: e
					}
				  	this.$http.post(shopOrderReceive,wind.stringify(obj))
				    .then(function (response) {
				    	const data = response.data;
				    	if(data.success == 1000){
				    		_that.$router.push({name: 'order',params:{id:5}});
				    	}
				    	
				  	})
				  	.catch(function (error) {
				    	
					});
				  
				  
				  
				},() => {
					
				})
			},
			orderEvaluate(e,event){
				this.$router.push({name: 'goodOrderDetail',params:{id:e}});
			},
			removeOrder(e,event){
				const _that = this;
				MessageBox.confirm('',{
					title: '提示',
					message : '确认删除此订单？',
					confirmButtonClass : 'messActive',
					cancelButtonClass: 'cancelMessActive',
				})
				.then(action => {
					const obj = {
						mainOrderNo: e
					}
				  	this.$http.post(shopOrderDelete,wind.stringify(obj))
				    .then(function (response) {
				    	const data = response.data;
				    	if(data.success == 1000){
				    		_that.list.splice(event,1);
				    	}
				    	
				  	})
				  	.catch(function (error) {
				    	
					});
				  
				  
				  
				},() => {
					
				})
			},
			goPay(){
				this.$router.push({name: 'goodBuy',params: { id: 3 }});
			},
			refund(e){
				this.$router.push({name: 'goodOrderRefund',params: { id: e}});
			}
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.searchList {
		
	}
	.listContent {
		margin-bottom: 0.4rem;
	}
	.list {
		position: relative;
		padding: 0.4rem;
		border-bottom: solid 0.032rem #F2F2F2;
		background: #fff;
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
		width: 4.5rem;
		height: 0.812rem;
		line-height: 0.812rem;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
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
	.goodBuyNumber {
		position: absolute;
		right: 0.4rem;
		bottom: 0.65rem;
		color: #333;
		font-size: 0.375rem;
	}
	.goodBuyStatus {
		position: absolute;
		right: 0.4rem;
		top: 0.5rem;
		color: #FC2A2E;
		font-size: 0.375rem;
	}
	.orderStatus {
		background: #fff;
	}
	.orderStatus ul li {
		padding: 0.4rem;
	}
	.orderStatusList {
		float: right;
		margin-left: 0.4rem;
		width: 2rem;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		color: #A3A3A3;
		border: solid 0.032rem #A3A3A3;
		font-size: 0.375rem;
		border-radius: 0.062rem;
	}
	.active {
		color: #FC2A2E;
		border: solid 0.032rem #FC2A2E;
	}
	.orderStatusListCont {
		font-size: 0.375rem;
		color: #FC2A2E;
	}
	.orderStatusListCont label {
		float: left;
		width: 1.625rem;
		height: 0.5rem;
	}
	.orderStatusListCont span {
		float: right;
		max-width: 7.2rem;
		height: 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: right;
	}
</style>