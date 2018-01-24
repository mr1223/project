<template>
	<div class="userFeedback">
		<order-message :message="message"></order-message>
		<p class="FeedbackContent">
			每一条反馈我们都会认真对待，我们将定期选出优秀的反馈意见，
			发送积分奖励哦~
		</p>
		<div class="Feedback_btn">
			<a @click="subFeedback" class="Feedback_submit">提交</a>
		</div>
	</div>
</template>

<script>
	import orderMessage from 'view/User/order/orderMessage';
	export default {
		data(){
			return {
				'message': {
					'content': '',
					'place': '请填写您的意见和建议',
				},
			}
		},
		
		created(){
				
		},
		methods: {
			subFeedback(){
				console.log(this.message);
			}
		},
		components:{
			orderMessage
		}
	}
</script>

<style scoped>
	.userFeedback {
		background: #fff;
		padding-top: 0.4rem;
	}
	.FeedbackContent {
		padding: 0 0.4rem;
		font-size: 0.375rem;
		color: #BDBDBD;
	}
	.Feedback_btn {
		padding: 0 0.4rem;
		padding-bottom: 7rem;
		margin-top: 1rem;
	}
	.Feedback_submit {
		display: block;
		height: 1.312rem;
		line-height: 1.312rem;
		background: #FC2A2E;
		color: #fff;
		text-align: center;
		font-size: 0.406rem;
		border-radius: 3px;
	}
</style>