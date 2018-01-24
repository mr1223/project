<template>
	<div class="code">
		<div v-bind:class="{'codeContent': tode.border_status}" class="codeBorder" v-for="tode in code">
			<input v-model="tode.val" v-bind:placeholder="tode.placeholder" type="number" />
			<span @click="getCode" v-if="tode.getCode">{{tode.getCode}}</span>
			<div style="clear: both;"></div>
		</div>
		<div class="codeBtn">
			<input @click="loginIn" type="button" value="确定" />
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { Toast,Indicator } from 'mint-ui';
	import { wind,cookie } from 'common/public';
	import { checkPhone } from 'common/regular';
	import { BASE_INFO,WECHAT_INFO } from 'common/consts';
	import { loginCheck,loginCheckCode,loginShopIn } from 'common/path';
	export default {
		data(){
			return {
				'code': [
					{
						'val': '',
						'placeholder': '请输入手机号',
						'border_status': true,
					},
					{
						'val': '',
						'placeholder': '请输入验证码',
						'getCode': '获取验证码',//9s后获取
						'border_status': false,
					}
				],
				'status': true,
				'loginCheckAddress': '',
			}
		},
		computed: {
            ...mapState({
            	BASE_INFO: state => state.BASE_INFO,
            }),
        },
		methods: {
			getCode(){
				const _that = this;
				const phone = this.code[0].val;
				
				if(this.status && this.phoneReg(phone)){
					
					this.$http.post(loginCheck,{
						params: {
							
						}
					})
					.then(function(response){
						
						const data = response.data;
			    		if(data.success == 1000){
			    			
			    			_that.loginCheckAddress = data.randMethod;
			    		}
					})
					.catch(function(error){
						
					})
				}
			},
			phoneReg(phone){
				
				if(phone == ''){
					Toast('手机号为空！');
					return false;
				}
				if(!checkPhone(phone)){
					Toast('手机号格式错误！');
					return false;
				}
				return true;
			},
			codeReg(code){
				if(code == ''){
					Toast('验证码为空！');
					return false;
				}
				console.log('codelength  '+code.length);
				if(code.length != 4){
					Toast('验证码长度错误！');
					return false;
				}
				return true;
			},
			loginIn(){
				const _that = this;
				const phone = this.code[0].val;
				const code = this.code[1].val;
				
				if(this.phoneReg(phone) && this.codeReg(code)){
					const obj = {
						mobilePhone: phone,
						vCode: code,
					}
					Indicator.open({
					  	text: '注册/登录中...',
					  	spinnerType: 'fading-circle'
					});
					this.$http.post(loginShopIn,wind.stringify(obj))
					.then(function(response){
						Indicator.close();
						const data = response.data;
			    		if(data.success == 1000){
			    			const base_info = data.base_info;
			    			const wechat_info = data.wechat_info;
			    			
			    			cookie.set(BASE_INFO,JSON.stringify(base_info));
			    			cookie.set(WECHAT_INFO,JSON.stringify(wechat_info));
			    			_that.$store.commit('INCREMENT', {
							  	BASE_INFO: base_info
							})
			    			_that.$store.commit('INCREMENT', {
							  	BASE_INFO: wechat_info
							})
			    			_that.$router.push(_that.$route.query.redirect || '/');
			    		}
					})
					.catch(function(error){
						Indicator.close();
					})
					
				}
			},
			timeCount(time){
				const _that = this;
				const times = setTimeout(function(){
					if(time < 0){
						_that.status = true;
						_that.code[1].getCode = '获取验证码';
						clearTimeout(times);
						return;
					}
					_that.code[1].getCode = time + 's后获取';
					time--;
					_that.timeCount(time);
				},1000)
			}
		},
		'watch': {
			loginCheckAddress(val,oldval){
				//loginCheckCode
				const _that = this;
				this.status = false;
				const phone = this.code[0].val;
				const loginCheckAddress = val;
				const obj = {
					mobilePhone: phone
				}
				
				this.$http.post(loginCheckAddress,wind.stringify(obj))
				.then(function(response){
					_that.status = true;
					const data = response.data;
		    		if(data.success == 1000){
		    			_that.timeCount(60);
		    			Toast(data.msg);
		    		}
				})
				.catch(function(error){
					_that.status = true;
				})
			}
		}
	}
</script>

<style scoped>
	.code {
		font-size: 0.437rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.loginStatus {
		padding-left: 3%;
		height: 32px;
		line-height: 32px;
		background: #f5f5f5;
		color: #b1b1b1;
		border-bottom: solid 0.031rem #e5e5e5;
		font-size: 0.437rem;
	}
	.codeContent {
		border-bottom: solid 0.031rem #e5e5e5;
	}
	.code label {
		float: left;
		width: 2rem;
		font-size: 0.437rem;
	}
	.code input {
		float: left;
		width: 4.7rem;
		font-size: 0.406rem;
		color: #666;
	}
	.codeBorder,.codeBtn {
		height: 1.312rem;
		line-height: 1.312rem;
	}
	.codeBorder {
		padding: 0 3%;
		padding-left: 5%;
		margin: 0 auto;
		background: #fff;
	}
	.codeBorder span {
		float: right;
		margin-top: 0.187rem;
		width: 3rem;
		height: 0.8125rem;
		line-height: 0.8125rem;
		border: solid 0.0312rem #FC2A2E;
		color: #FC2A2E;
		background: none;
		text-align: center;
		border-radius: 0.0625rem;
		font-size: 0.375rem;
		cursor: pointer;
	}
	.codeBorder input {
		height: 1.312rem;
	}
	.codeBtn {
		margin-top: 2.5rem;
		padding-top: 0.5rem;
		text-align: center;
	}
	.codeBtn input {
		float: none;
		width: 90%;
		height: 1.312rem;
		line-height: 1.312rem;
		margin: 0 auto;
		background: #FC2A2E;
		border-radius: 0.0625rem;
		font-size: 0.5rem;
		color: #fff ;
	}
</style>