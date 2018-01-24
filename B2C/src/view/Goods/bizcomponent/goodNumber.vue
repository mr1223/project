<template>
	<div class="searchList">
		<div class="list">
			<span @click="route(list.guid,list.status)" class="listImgCont">
				<img :src="list.netUrl" />
			</span>
			<div class="searchListCon">
				<p @click="route(list.guid,list.status)" class="goodDetail_goodName">
					{{list.goodName}} {{list.className}}
				</p>
				<p @click="route(list.guid,list.status)" class="goodDetail_goodNorm">
					{{list.goodNorm}}
				</p>
				<p class="goodDetail_Price">
					¥{{list.currentPrice}}
				</p>
			</div>
			<div v-if="order" class="goEvaluate">
				<a @click="goodEvaluate(order.mainOrderNo,list.orderNo,list.goodId)">去评价</a>
			</div>
			<span class="goodBuyNumber">x{{list.goodsNum}}</span>
			<div style="clear: both;"></div>
		</div>
	
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	

	export default {
		data(){
			return {
				
			}
		},
		props: {
			list: null,
			order: null
		},
		computed: {
            ...mapState({
            
            	ShopSelect: state => state.ShopSelect,
            }),
           
        },
		created(){
			
		},
		methods: {
			route(e,status){
				if(!status){
					const router = '/goodDetail/' + e;
					this.$router.push(router);
				}
			},
			goodEvaluate(main,order,id){
				this.$router.push({name: 'goodOrderEvaluate',params: {'id': main},query:{'orderNo':order,goodId: id}});
			},
		},
		components:{
		
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
	.goodBuyNumber {
		position: absolute;
		right: 0.4rem;
		bottom: 0.5rem;
		color: #333;
		font-size: 0.375rem;
	}
	.goEvaluate {
		padding: 0.4rem;
	
	}
</style>