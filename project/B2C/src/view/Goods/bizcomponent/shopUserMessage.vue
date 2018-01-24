<template>
	<div class="userMessage">
		<span class="photo">
			<img :src="message.headimgurl" />
		</span>
		<div class="message">
			<label>{{message.evalUserName}}</label>
			<span>{{message.evalTime}}</span>
		</div>
		<div class="star">
			<i v-for="(tode,index) in 5" :class="{'icon-Star': tode <= message.evalLevel,'icon-StarCopy': tode > message.evalLevel}" class="iconfont"></i>
		 	<!--<i class="iconfont icon-StarCopy"></i>
			<i class="iconfont icon-Star"></i>
		 	<i class="iconfont icon-Star"></i>
		 	<i class="iconfont icon-Star"></i>-->
		 	<div style="clear: both;"></div>
		</div>
		<div style="clear: both;"></div>
		<div class="content">
			{{message.evalContent}}
		</div>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				'star': []
			}
		},
		props: {
			message: null
		},
		created(){
			//evalLevel
			
		},
		methods: {
			
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.userMessage {
		position: relative;
		padding: 0.4rem 0;
		background: #fff;
	}
	.photo {
		float: left;
		margin-left: 0.4rem;
		width: 1.31rem;
		height: 1.31rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.photo img {
		width: 100%;
	}
	.message {
		float: left;
		margin-left: 0.2rem;
		width: 4rem;
		height: 1.31rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.message label {
		display: block;
		margin-top: 0.1rem;
		width: 100%;
		font-size: 0.437rem;
		color: #333;
	}
	.message span {
		display: block;
		margin-top: 0.3rem;
		width: 100%;
		font-size: 0.406rem;
		color: #BDBDBD;
	}
	.star {
		position: absolute;
		right: 0.4rem;
		width: 3.7rem;
	}
	.iconfont {
		float: left;
		margin-left: 0.2rem;
		color: #FFCC24;
	}
	.content {
		display: block;
		max-height: 1.3rem;
		padding: 0.4rem 0.4rem 0;
		color: #666;
		font-size: 0.437rem;
		overflow: hidden;
	}
	
</style>