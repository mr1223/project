<template>
	<div class="userMessage">
		<span>
			<img :src="WECHAT_INFO.headimgurl" />
		</span>
		<label>{{WECHAT_INFO.nicknName}}</label>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				
			}
		},
		computed: {
            ...mapState({
            	WECHAT_INFO: state => state.WECHAT_INFO,
            }),
        },
		created(){
			
			if(this.WECHAT_INFO){
				const wechat_info = this.WECHAT_INFO;
				console.log(JSON.parse(wechat_info));
				this.user = JSON.parse(wechat_info);
			}else{
				this.user = {};
			}
			
				
		},
		methods: {
			
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.userMessage {
		padding: 0.218rem 0;
		height: 1.31rem;
		background: #fff;
	}
	.userMessage span {
		float: left;
		margin-left: 0.218rem;
		width: 1.31rem;
		height: 1.31rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.userMessage span img {
		width: 100%;
	}
	.userMessage label {
		float: left;
		margin-left: 0.218rem;
		line-height: 1.31rem;
		font-size: 0.437rem;
		overflow: hidden;
	}
</style>