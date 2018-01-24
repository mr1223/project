<template>
	<div :class="{'borderBottom': userList.borderBottomStatus}" class="userList">
		<!--<i :class="userList.icon" class="shop_gouwuche iconfont" ></i>-->
		<label>{{userList.name}}</label>
		<router-link v-if="userList.link"  :to="userList.link">
			<i class="shop_more iconfont icon-more" ></i>
			<span class="userTel" v-if="userList.admin">{{userList.admin}}</span>
		</router-link>
		<i @click="emitClick" v-if="userList.select" class="shop_more iconfont icon-more" ></i>
		<i v-if="userList.tel" class="shop_more iconfont icon-more" ></i>
		<a class="userTel" v-if="userList.tel" :href="'tel:' + userList.tel">{{userList.admin}}&nbsp;&nbsp;&nbsp;&nbsp;{{userList.tel}}</a>
		<span :class="{'userTextActive': userList.userTextActive}" class="userText" v-if="userList.text">{{userList.text}}</span>
		<a class="userTel" v-if="userList.userTextSelect">{{userList.userTextSelect}}</a>
		<input v-if="userList.inputTxt" v-model="userList.inputText" class="userInputText" type="text" />
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				
			}
		},
		props: {
			userList: null
		},
		created(){
			
		},
		methods: {
			emitClick(e){
				this.$emit('getClick',event.target)
			}
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.userList {
		height: 1.312rem;
		line-height: 1.312rem;
		padding-left: 0.5rem;
		background: #fff;
		color: #242424;
		font-size: 0.406rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.borderBottom {
		border-bottom: solid 1px #F5F5F5;
	}
	.userTel{
		float: right;
		margin-right: 0.218rem;
		color: #666666;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
	}
	.shop_more {
		float: right;
		padding-right: 0.5rem;
		color: #242424;
		font-size: 0.375rem;
	}
	.userText {
		float: right;
		margin-right: 0.5rem;
		color: #FC2A2E;
	}
	.userTextActive {
		color: #121212;
	}
	.userInputText {
		width: 6.8rem;
		padding: 0 0.2rem;
		height: 1.312rem;
		line-height: 1.312rem;
	}
</style>