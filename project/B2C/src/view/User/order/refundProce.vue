<template>
	<div class="refundProce">
		<div v-if="refund.status == 1">
			<i class="iconfont icon-shenhezhong"></i>
			<label>请等待我们处理...</label>
			<span>剩余时间{{hour}}小时{{minute}}分</span>
		</div>
		<div v-if="refund.status == 2">
			<i class="iconfont icon-wancheng"></i>
			<label>申请成功</label>
		</div>
		<div v-if="refund.status ==3">
			<i class="iconfont icon-wancheng"></i>
			<label>退款成功</label>
			<span>2018-01-23</span>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				'time': '',
				'hour': 23,
				'minute': 23,
			}
		},
		props: {
			'refund': {
				'status': null
			}
		},
		created(){
				
		},
		methods: {
			
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.refundProce {
		padding: 0.4rem;
		padding-bottom: 0.6rem;
		background: #fff;
		text-align: center;
		
	}
	.refundProce i {
		display: block;
		font-size: 1.5rem;
		color: #ff4575;
	}
	.refundProce label {
		display: block;
		color: #FC2A2E;
		font-size: 0.5rem;
	}
	.refundProce span {
		display: block;
		margin-top: 0.1rem;
		font-size: 0.375rem;
		color: #BDBDBD;
	}
</style>