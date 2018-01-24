<template>
	<div class="userOrderList">
		<ul class="">
			<li @click="orderLook(index)" :class="{orderListActive: tode.active}" class="orderList" v-for="(tode,index) in orderList">
				<label>{{tode.name}}</label>
				<span></span>
			</li>
			<div style="clear: both;"></div>
		</li>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				id: this.$route.params.id,
				orderList: [
					{
						'name': '全部',
						'active': true,
					},
					{
						'name': '待付款',
						'active': false,
					},
					{
						'name': '待发货',
						'active': false,
					},
					{
						'name': '待收货',
						'active': false,
					},
					{
						'name': '待评价',
						'active': false,
					},
				]
			}
		},
		computed: {
            ...mapState({
            	order: state => state.order,
            }),
        },
		created(){
			const id = this.order;
			if(id != 1){
				this.orderList[0]['active'] = false;
				this.orderList[id - 1]['active'] = true;
			}
				
		},
		methods: {
			orderLook(event){
				this.$router.push({name: 'order',params: {id: event+1}});
			}
		},
		components:{
			
		},
		watch: {
			order(val,oldval){
				this.orderList[oldval-1]['active'] = false;
				this.orderList[val - 1]['active'] = true;
			}
		}
	}
</script>

<style scoped>
	.userOrderList {
		position: relative;
		padding: 0 0.4rem;
		height: 1.312rem;
		line-height: 1.312rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
		color: #999;
		font-size: 0.437rem;
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
</style>