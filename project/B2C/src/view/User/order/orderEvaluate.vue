<template>
	<div class="orderEvaluate">
		<div class="evaluateLevel">
			<label>综合评价</label>
			<i @click="Level(index)" :class="{'icon-StarCopy': !tode.active,'icon-Star': tode.active}" v-for="(tode,index) in star" class="iconfont"></i>
			<span>{{LeveContent}}</span>
		</div>
		<div class="EvaluateMessage">
			<order-message :message="message"></order-message>
		</div>
		<order-image :add="orderImage"></order-image>
		<order-refund-btn @submit="sub"></order-refund-btn>
	</div>
	
</template>

<script>
	import { mapState } from 'vuex';
	import { Toast } from 'mint-ui';
	import { wind } from 'common/public';
	import { evaluationAdd } from 'common/path';
	import orderMessage from './orderMessage';
	import orderImage from './orderImage';
	import orderRefundBtn from 'view/User/order/orderRefundBtn';
	export default {
		data(){
			return {
				'star': [
					{
						'active': false,
						'content': '非常差',
					},
					{
						'active': false,
						'content': '差',
					},
					{
						'active': false,
						'content': '一般',
					},
					{
						'active': false,
						'content': '好',
					},
					{
						'active': false,
						'content': '非常好',
					},
				],
				'LeveContent': '',
				'Levels': 0,
				'message': {
					'content': '',
					'place': '请输入评价内容',
				},
				'orderImage': true
				
			}
		},
		computed: {
            ...mapState({
            	ids: state => state.ids,
            }),
            ids:{
                // getter
                get: function () {
                    return this.$store.state.ids;
                },
                // setter
                set: function (newValue) {
                    this.$store.state.ids = newValue;
                }
            },
        },
		created(){
			console.log(this.$route.params);
			console.log(this.$route.query);
		},
		methods: {
			loginOut(){
				
			},
			Level(index){
				const active = this.star[index]['active'];
				for(var i = 0; i < this.star.length; i++){
					if(i > index){
						this.star[i]['active'] = false;
					}else{
						this.star[i]['active'] = true;
					}
				}
				this.LeveContent = this.star[index]['content'];
				this.Levels = index + 1;
			},
			
			sub(){
				const _that = this;
				
				const obj = {
					mainOrderNo: this.$route.params.id,
					orderNo:  this.$route.query.orderNo,
					goodsId:  this.$route.query.goodsId,
					evalLevel: this.Levels,
					evalContent: this.content,
					imageIds: this.ids,
				}
				this.$http.post(evaluationAdd,wind.stringify(obj))
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		Toast('您已提交成功');
			    		_that.$router.push({name: 'order',params: { id: 1}});
			    	}
			    })
			  	.catch(function (error) {
			  		
			  	});
				console.log('Levels '+this.Levels);
			},
			
		},
		components:{
			orderMessage,
			orderImage,
			orderRefundBtn,
		}
	}
</script>

<style scoped>
	.orderEvaluate {
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
		font-size: 0.375rem;
		color: #333;
		background: #fff;
	}
	.evaluateLevel {
		padding: 0.4rem;
		border-bottom: 0.032rem solid #f2f2f2;
	}
	.evaluateLevel label {
		margin-right: 0.4rem;
	}
	.evaluateLevel i {
		display: inline-block;
		width: 0.625rem;
		height: 0.625rem;
		margin-right: 0.3rem;
		color: #FFCC24;
	}
	.EvaluateMessage {
		padding: 0.4rem 0;
	}
	.orderEvaluate span {
		color: #999;
	}
</style>