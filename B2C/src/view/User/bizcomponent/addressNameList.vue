<template>
	<div :class="{'List_top_active': addressName.active || addressName.status}" @click="setAddress(addressName.guid,addressName.active,addressName.status)" class="List_top">
		<i v-if="addressName.active || addressName.status" class="iconfont_address iconfont icon-ditu"></i>
		<label>收货人：</label>
		<span>{{addressName.userName}}</span>
		<span class="mobile">{{addressName.mobile}}</span>
		<div style="clear: both;"></div>
		<p><label>收货地址：</label>{{addressName.addressDetail}}</p>
		<div style="clear: both;"></div>
	</div>

</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				
			}
		},
		props: {
			addressName:null,
			
		},
		computed: {
            ...mapState({
            	shopCarBuyAddress: state => state.shopCarBuyAddress, 
            }),
          	shopCarBuyAddress:{
                // getter
                get: function () {
                    return this.$store.state.shopCarBuyAddress;
                },
                // setter
                set: function (newValue) {
                    this.$store.state.shopCarBuyAddress = newValue;
                }
            },
        },
		created(){
			
		},
		methods: {
			setAddress(e,event,status){
				
				if(event){
					const fullPath = this.$router.history.current.fullPath;
					this.$router.push({
			            path: '/addressMange',
			            query: {redirect: fullPath} 
			       	})
					//this.$router.push(_that.$route.query.redirect || '/');
				}
				if(!event && this.$route.query.redirect){
					const _that = this;
					const address = this.addressName;
					console.log(address);
					address.active = true;
					console.log(address);
					this.$store.commit('INCREMENT',{
						shopCarBuyAddress: address
					})
					this.$store.dispatch('setUpCarBuyAddress',address);
					this.$router.push(this.$route.query.redirect);
				}
				if(status){
					//
				}
			}
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.List {
		background: #fff;
		margin-bottom: 0.218rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.List_top {
		position: relative;
		padding: 0.25rem;
		border-bottom: solid 0.031rem #F2F2F2;
		color: #333;
		font-size: 0.406rem;
		font-weight: 500;
		background: #fff;
	}
	.List_top_active {
		padding-left: 1.1rem;
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
		height: auto;
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
	.iconfont_address {
		position: absolute;
		top: 0.5rem;
		left: 0.2rem;
		color: #FC2A2E;/*666666*/
		font-size: 0.8rem;
	}
</style>