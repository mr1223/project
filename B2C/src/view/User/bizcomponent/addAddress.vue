<template>
	<div class="addAddress">
		<div :class="{borderBottom: tode.borderBottom}" v-for="tode in address" class="addAddressContent">
			<label>{{tode.name}}</label>
			<input class="AddressText" :readonly="tode.read" v-model="tode.val" :type="tode.type" :placeholder="tode.place" />
			<i @click="setAddress" v-if="tode.more" class="shop_more iconfont icon-more" ></i>
		</div>
		<div class="addressBtn">
			<input @click="addressIn" type="button" value="确定" />
		</div>
		<mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">  
          	<div class="picker-toolbar">  
	            <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>  
	            <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>  
          		<div style="clear: both;"></div>
          	</div>  
          	<mt-picker :slots="slots" value-key ="name" @change="onCityChange" :visible-item-count="3"></mt-picker>  
        </mt-popup>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { Toast,Indicator,Picker,Popup } from 'mint-ui';
	import { wind } from 'common/public';
	import { checkPhone } from 'common/regular';
	import { userAddress,listAllProvince,listCity,listCounty } from 'common/path';
	export default {
		data(){
			return {
				"provinces": [],//省份删选
				"cities": [],//城市删选
				"areas": [],//县区删选
				'provincesStatus': true,//省份请求状态  去掉重复请求
				'citiesStatus': true,//城市请求状态  去掉重复请求
				'areasStatus': true,//区县请求状态  去掉重复请求
				"address": [
					{
						'type': 'text',
						'name': '收货人',
						'val': '',
						'place': '请输入收货人姓名',
						'more': false,
						'read': false,
						'borderBottom': true,
					},
					{
						'type': 'number',
						'name': '联系电话',
						'val': '',
						'place': '请输入联系电话',
						'more': false,
						'read': false,
						'borderBottom': true,
					},
					{
						'type': 'text',
						'name': '收货地址',
						'val': '',
						'place': '请选择收货的城市',
						'more': true,
						'read': true,
						'borderBottom': true,
					},
					{
						'type': 'text',
						'name': '详细地址',
						'val': '',
						'place': '请输入楼号／单元／门号',
						'more': false,
						'read': false,
						'borderBottom': true,
					}
				],
				'slots': [
					{
			          	flex: 1,
			          	values: [],
			          	className: 'slot1',
			          	textAlign: 'right',
			          	defaultIndex: 0,
			        }, 
			        {
			          	divider: true,
			          	content: '-',
			          	className: 'slot2'
			        }, 
			        {
			          	flex: 1,
			          	values: [],
			          	className: 'slot3',
			          	textAlign: 'left',
			          	defaultIndex: 0,
			        }, 
			        {
			          	divider: true,
			          	content: '-',
			          	className: 'slot4'
			        }, 
			        {
			          	flex: 1,
			          	values: [],
			          	className: 'slot5',
			          	textAlign: 'left',
			          	defaultIndex: 0,
			        }
				],
				'selectProvinces': {},
				'selectCities': {},
				'selectAreas': {},
				'index': false,
				'popupVisible': false,
			}
		},
		computed: {
            ...mapState({
            	addressCon: state => state.addressCon, 
            }),
        },
		created(){
			const _that = this;
			if(this.$route.params.id == -1){
				this.$store.dispatch('addAddrss');
			}
			
			if(this.addressCon){
				//初始化
				const addressCon = this.addressCon;
				this.address[0]['val'] = addressCon.userName;
				this.address[1]['val'] = addressCon.mobile;
				this.address[2]['val'] = addressCon.provinceName + " " + addressCon.cityName + " " + addressCon.countyName;
				this.address[3]['val'] = addressCon.address;
				this.selectProvinces['provinceId'] = addressCon['provinceId'];
				this.selectProvinces['provinceName'] = addressCon['provinceName'];
				this.selectCities['cityId'] = addressCon['cityId'];
				this.selectCities['cityName'] = addressCon['cityName'];
				this.selectCities['countyId'] = addressCon['countyId'];
				this.selectCities['countyName'] = addressCon['countyName'];
				
				const provinceId = addressCon.provinceId;
				const countyId = addressCon.cityId;
				this.getProvin();
			    this.getCitys(provinceId,true);
			    this.getCounty(countyId,true);
		    }
			
		},
		methods: {
			setAddress(){
				this.popupVisible = true;
			},
			cancleaddress(){
				this.popupVisible = false;
			},
			selectaddress(){
				const provinceName = this.selectProvinces['provinceName'];
				const cityName = this.selectCities['cityName'];
				const countyName = this.selectAreas['countyName'];
				const val = provinceName + " " + cityName + " " + countyName;
				this.address[2]['val'] = val;
				this.popupVisible = false;
			},
			onCityChange(picker, values){
				
				const prvalue = picker.getSlotValue(0);
				const cityvalue = picker.getSlotValue(1);
				const areavalue = picker.getSlotValue(2);
		
				if(prvalue && this.selectProvinces['provinceId'] != prvalue['provinceId']){
					
					this.getCitys(prvalue['provinceId']);
					this.selectProvinces = prvalue;
					
				}
				if(cityvalue && this.selectCities['cityId'] != cityvalue['cityId']){
					this.getCounty(cityvalue['cityId']);
					this.selectCities = cityvalue;
				}
				if(areavalue && this.selectAreas['countyId'] != areavalue['countyId']){
					this.selectAreas = areavalue;
				}
					
				
			},
			addressIn(){
				const _that = this;
				const obj = this.getAddress();
			
				if(!obj){
					return;
				}
				this.$http.post(userAddress,wind.stringify(obj))
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		_that.$router.push({name:'addressMange'});
			    	}
			    	
			  	})
			  	.catch(function (error) {
			  		
			    	console.log(error);
				});
			},
			getAddress(){
				var guid = '';
				
				if(this.$route.params.id != -1){
					guid = this.$route.params.id;
				}
				const userName = this.address[0]['val'];
				const mobile = this.address[1]['val'];
				const provinceId = this.selectProvinces['provinceId'];
				const cityId = this.selectCities['cityId'];
				const countyId = this.selectAreas['countyId'];
				const countyName = this.selectAreas['countyName'];
				const address = this.address[3]['val'];
				
				
				if(userName == ''){
					Toast(this.address[0]['place']);
					return false;
				}
				if(mobile == ''){
					Toast(this.address[1]['place']);
					return false;
				}
				if(!checkPhone(mobile)){
					Toast('手机号格式错误！');
					return false;
				}
				if(provinceId == ''){
					Toast(this.address[2]['place']);
					return false;
				}
				if(address == ''){
					Toast(this.address[3]['place']);
					return false;
				}
				const data = {
					'guid': guid,
					'userName': userName,
					'userPhone': mobile,
					'provinceId': provinceId,
					'cityId': cityId,
					'countyId': countyId,
					'address': address,
				};
				return data;
			},
			sortNumber(a,b,val){
				//provinceId
				return a[val] - b[val];
			},
			addName(obj,name){
				for(var i = 0 ; i < obj.length; i++){
	    			obj[i]['name'] = obj[i][name];
	    		}
				return obj;
			},
			indexs(id,name,obj){
				if(obj.length <= 0) return false;
				var index = '';
				for(var i = 0 ; i < obj.length; i++){
					if(obj[i][name] == id){
						index = i;
					}
				}
				return index;
			},
			getProvin(type){
				const _that = this;
				this.$http.post(listAllProvince)
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		const province = _that.addName(data.provinces,'provinceName');
			    		//._that.sortNumber()
			    		const provinces = province.sort(function (a, b) {
						  	return (a.provinceId - b.provinceId)
						});
						_that.slots[0]['values'] = provinces;
						if(type == 1){
							const provinceId = _that.addressCon.provinceId;
							const provinceIndex = _that.indexs(provinceId,'provinceId',provinces);
							_that.slots[0]['defaultIndex'] = provinceIndex;
						}
			    		
			    	}
			    	
			  	})
			},
			getCitys(provinceId,setUpDefa){
				const _that = this;
				const obj = {
					'provinceId': provinceId
				}
				this.$http.post(listCity,wind.stringify(obj))
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		const city = _that.addName(data.citys,'cityName');
			    		const citys = city.sort(function (a, b) {
						  	return (a.cityId - b.cityId)
						});
			    		_that.slots[2]['values'] = citys;
			    		if(setUpDefa){
			    			const cityId = _that.addressCon.cityId;
							const cityIndex = _that.indexs(cityId,'cityId',citys);
							_that.slots[2]['defaultIndex'] = cityIndex;
			    		}
			    	}
			    	
			  	})
			},
			getCounty(cityId,setUpDefa){
				const _that = this;
				const obj = {
					'cityId': cityId
				}
				
				this.$http.post(listCounty,wind.stringify(obj))
			    .then(function (response) {
			    
			    	const data = response.data;
			    	if(data.success == 1000){
			    		const county = _that.addName(data.countys,'countyName');
			    		const countys = county.sort(function (a, b) {
						  	return (a.countyId - b.countyId)
						});
			    		_that.slots[4]['values'] = countys;
			    		if(setUpDefa){
			    			const areaId = _that.addressCon.countyId;//县区ID
			    			
							const areaIndex = _that.indexs(areaId,'countyId',countys);
							_that.slots[4]['defaultIndex'] = areaIndex;
			    		}
			    	}
			  	})
			}
		},
		components:{
			mtPicker: Picker,
			mtPopup: Popup,
		},
		watch: {
			/*provinces(val,oldval){
				const _that = this;
				const provinceId = this.addressCon.provinceId;
				const provinceIndex = this.indexs(provinceId,'provinceId',val);
				this.slots[0]['defaultIndex'] = provinceIndex;
				this.getCitys(provinceId);
			},
			cities(val,oldval){
				const _that = this;
				const cityId = this.addressCon.cityId;//城市ID
				const cityIndex = this.indexs(cityId,'cityId',val);
				this.slots[2]['defaultIndex'] = cityIndex;
				this.getCounty(cityId);
			}*/
		}
	}
</script>

<style scoped>
	.addAddressContent {
		height: 1.312rem;
		line-height: 1.312rem;
		padding-left: 5%;
		background: #fff;
		color: #666666;
		font-size: 0.406rem;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.borderBottom {
		border-bottom: solid 1px #F5F5F5;
	}
	.addAddressContent label {
		float: left;
		width: 2rem;
	}
	.AddressText {
		float: left;
		width: 6rem;
		height: 1.312rem;
		line-height: 1.312rem;
		color: #666666;
	}
	.userTel{
		float: right;
		margin-right: 0.218rem;
		color: #666666;
	}
	.shop_more {
		float: right;
		padding-right: 5%;
		color: #BDBDBD;
		font-size: 0.375rem;
	}
	.mint-popup-4 {
		width: 100%;
	}
	.mint-datetime-action {
		color: #fc2a2e;
	}
	.addressBtn {
		width: 100%;
	}
	.addressBtn input {
		display: block;
		margin: 0 auto;
		margin-top: 2rem;
		width: 90%;
		height: 1.312rem;
		line-height: 1.312rem;
		text-align: center;
		color: #fff;
		background: #fc2a2e;
		border-radius: 0.0625rem;
		font-size: 0.437rem;
	}
</style>