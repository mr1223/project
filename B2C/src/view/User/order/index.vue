<template>
	<div class="order">
		<ul v-if="orderStatus" class="">
			<li @click="orderLook(index)" :class="{orderListActive: tode.active}" class="orderList" v-for="(tode,index) in orderList">
				<label>{{tode.name}}</label>
				<span></span>
			</li>
			<div style="clear: both;"></div>
		</ul>
		<div v-if="orderStatus" class="orderListCon">
			<mt-tab-container v-model="active" :swipeable="true">
			  	<mt-tab-container-item id="table1">
			    	<mt-cell  v-if="orderList[0]['show']">
			    		<div class="orderListContent">
			    			<order-number :list="orderList[0]['data']"></order-number>
			    		</div>
			    	</mt-cell>
			    	<no-data v-if="!orderList[0]['show']" :goodnoshop="goodnoshop"></no-data>
			  	</mt-tab-container-item>
			  	<mt-tab-container-item id="table2">
			    	<mt-cell v-if="orderList[1]['show']">
			    		<div class="orderListContent">
			    			<order-number :list="orderList[1]['data']"></order-number>
			    		</div>
			    	</mt-cell>
			    	<no-data v-if="!orderList[1]['show']" :goodnoshop="goodnoshop"></no-data>
			  	</mt-tab-container-item>
			  	<mt-tab-container-item id="table3">
			    	<mt-cell v-if="orderList[2]['show']">
			    		<div class="orderListContent">
			    			<order-number :list="orderList[2]['data']"></order-number>
			    		</div>
			    	</mt-cell>
			    	<no-data v-if="!orderList[2]['show']" :goodnoshop="goodnoshop"></no-data>
			  	</mt-tab-container-item>
			  	<mt-tab-container-item id="table4">
			    	<mt-cell v-if="orderList[3]['show']">
			    		<div class="orderListContent">
			    			<order-number :list="orderList[3]['data']"></order-number>
			    		</div>
			    	</mt-cell>
			    	<no-data v-if="!orderList[3]['show']" :goodnoshop="goodnoshop"></no-data>
			  	</mt-tab-container-item>
			  	<mt-tab-container-item id="table5">
			    	<mt-cell v-if="orderList[4]['show']">
			    		<div class="orderListContent">
			    			<order-number :list="orderList[4]['data']"></order-number>
			    		</div>
			    	</mt-cell>
			    	<no-data v-if="!orderList[4]['show']" :goodnoshop="goodnoshop"></no-data>
			  	</mt-tab-container-item>
			</mt-tab-container>
			<div style="clear: both;"></div>
		</div>
		<div v-if="!orderStatus">
			<div class="orderListContent">
    			<order-number :list="searchlist"></order-number>
    		</div>
		</div>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { Indicator,TabContainer,TabContainerItem,Cell } from 'mint-ui';
	import noData from 'component/noData';
	import { wind } from 'common/public';
	import { shopOrderList,shopOrderLogistics } from 'common/path';
	import {toNumber} from 'common/reg';
	import orderNumber from './orderNumber';
	export default {
		data(){
			return {
				'id': this.$route.params.id,
				'active': 'table1',
				'orderStatus': true,
				'orderList': [
					{
						'name': '全部',
						'active': true,
						'data': [],
						'show': true,
					},
					{
						'name': '待付款',
						'active': false,
						'data': [],
						'show': true,
					},
					{
						'name': '待发货',
						'active': false,
						'data': [],
						'show': true,
					},
					{
						'name': '待收货',
						'active': false,
						'data': [],
						'show': true,
					},
					{
						'name': '待评价',
						'active': false,
						'data': [],
						'show': true,
					},
				],
				'searchlist': null,
				'goodnoshop': {
					'describe':'暂无数据',
					'show': true,
				},
			}
		},
		computed: {
            ...mapState({
            	order: state => state.order,
            }),
        },
		created(){
			Indicator.open({
			  	text: '加载中...',
			  	spinnerType: 'fading-circle'
			});
			const _that = this;
			const id = this.order;
			if(id != 1 && id != 6){
				this.orderList[0]['active'] = false;
				this.orderList[id - 1]['active'] = true;
				this.active = 'table' + id;
			}
			if(id == 6){
				this.orderStatus = false;
			}
			
			this.$http.post(shopOrderList)
		    .then(function (response) {
		    	Indicator.close();
		    	const data = response.data;
		    	if(data.success == 1000){
		    		const orders = data.orders;
		    		const order_payment = []; //待付款
		    		const order_delivery = []; //待发货
		    		const order_received = []; //待收货
		    		const order_evaluate = []; //待评价
		    		const order_service = []; //售后 
		    		for(var i = 0; i < orders.length; i++){
		    			orders[i]['orderStauts'] = 2;
		    			orders[i]['logisticsStatus'] = 3
		    			if(orders[i]['orderStauts'] == 1){
		    				order_payment.push(orders[i]);
		    			}
		    			if(orders[i]['orderStauts'] == 2 && orders[i]['logisticsStatus'] == 1){
		    				order_delivery.push(orders[i]);
		    			}
		    			if(orders[i]['orderStauts'] == 2 && orders[i]['logisticsStatus'] == 2){
		    				order_received.push(orders[i]);
		    			}
		    			if(orders[i]['orderStauts'] == 2 && orders[i]['logisticsStatus'] == 3){
		    				order_evaluate.push(orders[i]);
		    			}
		    			if(orders[i]['orderStauts'] == 7 || orders[i]['logisticsStatus'] == 4){
		    				order_service.push(orders[i]);
		    			}
		    			//
		    			_that.orderList[0]['data'] = orders;
		    			_that.orderList[1]['data'] = order_payment;
		    			_that.orderList[2]['data'] = order_delivery;
		    			_that.orderList[3]['data'] = order_received;
		    			_that.orderList[4]['data'] = order_evaluate;
		    			if(orders.length == 0){
		    				_that.orderList[0]['show'] = false;
		    			}
		    			if(order_payment.length == 0){
		    				_that.orderList[1]['show'] = false;
		    			}
		    			if(order_delivery.length == 0){
		    				_that.orderList[2]['show'] = false;
		    			}
		    			if(order_received.length == 0){
		    				_that.orderList[3]['show'] = false;
		    			}
		    			if(order_evaluate.length == 0){
		    				_that.orderList[4]['show'] = false;
		    			}
		    			
		    			
		    		}
		    		_that.searchlist = data.orders;
		    		_that.orderList[0]['data'] = data.orders;
		    		
		    	}
		  	})
			.catch(function (error) {
		  		Indicator.close();
		    	console.log(error);
			});	
			
			
			
			
			
			
			
			
			
			//发货状态查询
			/*
			const obj = {
				logisticsStatus: 1
			}
			this.$http.post(shopOrderLogistics,wind.stringify(obj))
		    .then(function (response) {
		    	Indicator.close();
		    	const data = response.data;
		    	if(data.success == 1000){
		    		console.log(data);
		    	}
		  	})
			.catch(function (error) {
		  		Indicator.close();
		    	console.log(error);
			});	*/
			
			
		},
		methods: {
			orderLook(event){
				this.active = 'table' + (event + 1);
				this.$router.push({name: 'order',params: {id: event+1}});
			}
		},
		components:{
			mtTabContainer: TabContainer,
			mtTabContainerItem: TabContainerItem,
			mtCell: Cell,
			orderNumber,
			noData,
		},
		watch: {
			order(val,oldval){
				this.orderList[oldval-1]['active'] = false;
				this.orderList[val - 1]['active'] = true;
			},
			active(val,oldval){
				
				const newVal = val.replace(toNumber,"");
				this.$router.push({name: 'order',params: {id: newVal}});
			}
		}
	}
</script>

<style scoped>
	.order {
		position: relative;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
		color: #999;
		font-size: 0.437rem;
	}
	.order ul {
		height: 1.312rem;
		line-height: 1.312rem;
		padding: 0 0.4rem;
		margin-bottom: 0.4rem;
		background: #fff;
	}
	.orderList {
		position: relative;
		float: left;
		width: 20%;
		text-align: center;
	}
	.orderListActive {
		color: #FC2A2E;
	}
	.orderListActive span{
		position: absolute;
		bottom: 0;
		left: 10%;
		width: 80%;
		height: 0.093rem;
		background: #FC2A2E;
	}
	.orderListCon {
		width: 10rem;
	}
	.orderListContent {
		width: 10rem;
	}
</style>