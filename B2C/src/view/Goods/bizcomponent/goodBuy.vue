<template>
	<div class="goodBuy">
		<div class="goodBuyAddress">
			<div @click="AddAddress" v-if="show" class="addAddress">
				+添加收货地址
			</div>
			<address-name-list v-if="!show" :addressName="shopCarBuyAddress"></address-name-list>
		</div>
		<div class="goodBuyTime">
			<label>次日达</label>
			<span>（2018-01-15配送）</span>
		</div>
		<div class="goodNumber">
			<good-number :key="tode" v-for="(tode,index) in shopCarBuy" :list="tode"></good-number>
		</div>
		<div class="payStyle">
			<shop-title :title="payStyle"></shop-title>
		</div>
		<div class="payStyleContent">
			<div class="payStyleList">
				<label>微信支付</label>
				<!--<v-radio :SELECTVALUE="SELECTVALUE" :name="pay" :value=1></v-radio>-->
			</div>
			<div class="payStyleList payStyleListActive">
				<label>货到付款</label>
				<!--<v-radio :SELECTVALUE="SELECTVALUE" :name="pay" :value=2></v-radio>-->
			</div>
		</div>
		<div class="">
			<good-buy-btn></good-buy-btn>
		</div>
		<mt-popup v-model="shopCar" position="bottom" class="mint-popup-4">  
          	<div class="addressMange">
          		<address-name-list v-for="(tode,index) in addressList" :key="tode" :addressName="tode"></address-name-list>
          	</div>
        </mt-popup>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { Indicator,Popup } from 'mint-ui';
	import vRadio from 'component/radio';
	import addressNameList from 'view/User/bizcomponent/addressNameList';
	import goodNumber from 'view/Goods/bizcomponent/goodNumber';
	import goodBuyBtn from 'view/Goods/bizcomponent/goodBuyBtn';
	import shopTitle from './shopTitle';
	import { wind } from 'common/public';
	import { goodClassList,userAddressList } from 'common/path';
	export default {
		data(){
			return {
				'SELECTVALUE': 1,
				'pay': 'sss',
				'show': true,
				'value': 1,
				'shopCar': false,
				'payStyle': '支付方式',
				'active': 1,//支付方式显示
				'addressList': [],
				'options' : [
				  	{
					    label: '微信支付',
					    value: 1,
				  	},
				  	{
					    label: '货到付款',
					    value: 2,
				  	}
				],
				'goodBuyAddress': {
					"guid": 1, //收货地址ID
			        "userId": 1,//用户ID
			        "userName": "陆桂英",//收货人姓名
			        "mobile": 18910895936,//收货手机号
			        "provinceId": 110000,//省份ID
			        "provinceName": '北京',//省份名称
			        "cityId": 110100,//城市ID
			        "cityName": '北京市',//城市名称
			        "countyId": 110101,//区县ID
			        "countyName": '东城区',//address
			        "address": "谭芳",//门牌信息
			        "addressDetail": "谭芳",//详细地址
			        "isDefault": 1,//否为默认地址
				}
			}
		},
		computed: {
            ...mapState({
            	shopCarBuy: state => state.shopCarBuy,
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
			console.log(this.$router.params);
			console.log(this.$route.query);
			const _that = this;
			const obj = {
				searchWord: '测试'
			}
		  	
		  	if(!this.shopCarBuyAddress || this.shopCarBuyAddress.length == 0){
		  		this.show = true;
		  		this.getAddress();
		  	}else{
		  		
		  		this.show = false;
		  	}
		   
		},
		methods: {
			AddAddress(){
				const fullPath = this.$router.history.current.fullPath;
				this.$router.push({
		            path: '/addressMange',
		            query: {redirect: fullPath} 
		       	})
			},
			getAddress(){
				const _that = this;
				this.$http.post(userAddressList)
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		_that.show = false;
			    		_that.addressList = data.addressList;
			    		_that.defa(data.addressList);
			    	}
			  	})
			},
			defa(obj){
				if(obj.length <= 0){
					return;
				}
				for(var i = 0; i < obj.length ;i++){
					obj[i]['active'] = true;
					if(obj[i]['isDefault'] == 1 || obj[i]['isDefault'] == "1"){
						this.$store.dispatch('setUpCarBuyAddress',obj[i]);
					}
				}
			}
		},
		components:{
			vRadio,
			addressNameList,
			goodNumber,
			shopTitle,
			goodBuyBtn,
			mtPopup: Popup,
		},
		watch: {
			
		}
	}
</script>

<style scoped>
	.goodBuy {
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.goodBuyAddress {
		width: 100%;
		height: auto;
	}
	.addAddress {
		line-height: 1.904rem;
		text-align: center;
		color: #FC2A2E;
		font-size: 0.5rem;
		font-weight: 600;
		background: #fff;
	}
	.goodBuyTime {
		margin-top: 0.218rem;
		padding: 0.4rem;
		background: #fff;
		font-size: 0.406rem;
		color: #999;
		border-bottom: solid 0.032rem #F2F2F2;
	}
	.goodBuyTime label {
		color: #333;
	}
	.payStyle {
		margin-top: 0.218rem;
	}
	.payStyleContent {
		background: #fff;
	}
	.payStyleList {
		position: relative;
	    margin-left: .5rem;
	    height: 1.312rem;
	    line-height: 1.312rem;
	    border-bottom: .032rem solid #f2f2f2;
	    color: #333;
	    font-weight: 600;
	    font-size: .437rem;
	}
	.payStyleList span {
	    float: right;
	    margin: 0.5rem .4rem 0 .1rem;
	    width: .5rem;
	    height: .5rem;
	    text-align: center;
	    line-height: .4rem;
	    
	}
	.payStyleList .icon-radiofill {
		color: #fc2a2e;
		font-size: 0.6rem;
	}
	.payStyleList .icon-radiobox-blank {
		color: #999;
		font-size: 0.65rem;
	}
	.addressMange {
		width: 10rem;
	}
	
</style>