<template>
	<div class="addressList">
		<div class="List" v-for="(tode,index) in addressList">
			<address-name-list :addressName="tode"></address-name-list>
			<div class="List_bottom">
				<span :class="{active: tode.isDefault == 1}" @click="Default(index)">
					<i class="iconfont icon-sheweimorendizhi"></i>
					设为默认地址
				</span>
				<span @click="remove(index)" class="right">
					<i class="iconfont icon-shanchu"></i>
					删除
				</span>
				<span @click="edit(index)" class="right">
					<i class="iconfont icon-editing"></i>
					编辑
				</span>
				<div style="clear: both;"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { MessageBox } from 'mint-ui';
	import addressNameList from 'view/User/bizcomponent/addressNameList';
	import { wind } from 'common/public';
	import { setDefault,addressRemove } from 'common/path';
	export default {
		data(){
			return {
				'user': {}
			}
		},
		props: {
			addressList:null
		},
		computed: {
            ...mapState({
            	addressEdit: state => state.addressEdit,
            }),
        },
		created(){},
		methods: {
			remove(event){
				const _that = this;
				const guid = this.getGuid(event);
				MessageBox.confirm('',{
					title: '提示',
					message : '确认要删除该地址吗？',
					confirmButtonClass : 'messActive',
					cancelButtonClass: 'cancelMessActive',
				})
				.then(action => {
					const obj = {
						guid: guid
					}
				  	this.$http.post(addressRemove,wind.stringify(obj))
				    .then(function (response) {
				    	const data = response.data;
				    	if(data.success == 1000){
				    		_that.removeAddress(event);
				    	}
				    	
				  	})
				  	.catch(function (error) {
				    	
					});
				  
				  
				  
				},() => {
					
				})
				
			},
			Default(event){
				const _that = this;
				const guid = this.getGuid(event);
				const obj = {
					guid: guid
				}
				this.$http.post(setDefault,wind.stringify(obj))
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		_that.setStyle(event);
			    	}
			    	
			  	})
			  	.catch(function (error) {
			    	
				});
			},
			getGuid(event){
				return this.addressList[event]['guid'];
			},
			setStyle(event){
				for(var i = 0; i < this.addressList.length; i++){
					this.addressList[i]['isDefault'] = 0;
				}
				this.addressList[event]['isDefault'] = 1;
			},
			removeAddress(event){
				this.addressList.splice(event,1);
			},
			edit(event){
				const _that = this;
				const guid = this.getGuid(event);
				const obj = this.addressList[event];
				this.$store.commit('INCREMENT', {
				  	addressEdit: obj
				})
				this.$store.dispatch('editAddree');
				this.$router.push({name:'addAddress',params: {id: guid}});
			}
		},
		components:{
			addressNameList
		}
	}
</script>

<style scoped="">
	.List {
		background: #fff;
		margin-bottom: 0.218rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.List_top {
		padding: 0.25rem;
		border-bottom: solid 0.031rem #F2F2F2;
		color: #333;
		font-size: 0.406rem;
		font-weight: 500;
	}
	.List_top label {
		float: left;
		display: inline-block;
		color: #666;
		height: 0.687rem;
		line-height: 0.687rem;
	}
	.List_top span {
		float: left;
		display: inline-block;
		max-width: 3.75rem;
		height: 0.687rem;
		line-height: 0.687rem;
		color: #333;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.List_top .mobile {
		float: right;
	}
	.List_top p {
		height: 0.687rem;
		line-height: 0.687rem;
	}
	.List_bottom {
		padding: 0.156rem;
		color: #999;
		font-size: 0.437rem;
	}
	.List_bottom span {
		display: inline-block;
	}
	.right {
		float: right;
		margin-right: 0.125rem;
		margin-left: 0.5rem;
	}
	.right i {
		margin-top: 0.0625rem;
	}
	.active {
		color: #fc2a2e;
	}
</style>