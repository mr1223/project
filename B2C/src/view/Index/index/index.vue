<template>
	<div class="index">
		<search></search>
		<index-title :title="everyClass"></index-title>
		<square :square = "GoodClassification"></square>
		<index-title :title="special"></index-title>
		<div v-if="!goodnoshop.show" class="indexshopList" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<Loadmore :top-method="loadTop" :bottom-dropped="dropped" :bottom-method="loadBottom" :bottom-distance ="Distance"  @bottom-status-change="handleBottomChange"  :bottom-all-loaded="allLoaded" :auto-fill="fill" ref="loadmore">
				<shop :shop = "shop"></shop>
				<!--<li v-for="item in shop" class="page-loadmore-listitem">{{ item }}</li>-->
			</Loadmore>
			
		</div>
		<v-phone></v-phone>
		<noData :goodnoshop="goodnoshop"></noData>
		<mt-popup v-model="shopCar" position="bottom" class="mint-popup-4">  
          	<good-quantity></good-quantity>
        </mt-popup>
		<bottom></bottom>
	</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex';
	import { Toast,Indicator,Loadmore,Popup } from 'mint-ui';
	import noData from 'component/noData';
	import {api_classification_first,goodList} from 'common/path';
	import {classification_first} from 'common/consts';
	import search from 'component/search';
	import square from 'component/square';
	import vPhone from 'view/Index/bizcomponent/phone';
	import shop from 'component/shop';
	import bottom from 'component/bottom';
	import indexTitle from '../bizcomponent/indexTitle';
	import goodQuantity from 'view/Goods/bizcomponent/goodQuantity';
	import {session,cookie,wind} from 'common/public';
	export default {
		data(){
			return {
				'fill': true,
				'dropped': true,
				'everyClass': {
					'name': '全部分类'
				},
				'special': {
					'name': '特价促销'
				},
				'shop': [],
				'list': [],
				'currentPageForApp': 1,
				'showCount': 70,
				'allLoaded': true,
				'Distance': 70,
        		'bottomText': '上拉加载更多...',
        		'wrapperHeight': 230,
        		'bottomStatus': '',
        		'ajaxStatus': true,
        		'goodquantity': {
        			'quantity': {},
        		},
        		'goodnoshop': {
					'describe':'暂无推荐产品',
					'show': true,
				},
			}
		},
		computed: {
            ...mapState({
            	GoodClassification: state => state.classification_first,
            	shopCar: state => state.shopCar,
            }),
            shopCar:{
                // getter
                get: function () {
                    return this.$store.state.shopCar;
                },
                // setter
                set: function (newValue) {
                    this.$store.state.shopCar = newValue;
                }
            },
        },
        created(){
        	Indicator.open({
			  	text: '加载中...',
			  	spinnerType: 'fading-circle'
			});
			this.$store.commit('INCREMENT', {
			    navIndex: 0
			})
			//this.getList();
		},
		mounted(){
			//this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			this.wrapperHeight = 224 * 2;
		},
		methods: {
			
			getList(){
				const _that = this;
				if(!_that.ajaxStatus) return;
				
				if(this.currentPageForApp != 1 && this.allLoaded){
					Toast('暂无更多数据') 
					return;
				} 
				_that.ajaxStatus = false;
				this.allLoaded = true;
				const obj = {
					currentPageForApp: _that.currentPageForApp,
				    showCount: _that.showCount,
				}
				
				this.$http.post(goodList,wind.stringify(obj))
			    .then(function (response) {
			    	Indicator.close();
			    	_that.ajaxStatus = true;
			    	const data = response.data;
			    	if(data.success == 1000){
			    		const DpGoodsList = data.DpGoodsList
			    		if(DpGoodsList.length == 0){
			    			_that.allLoaded = true;
			    			Toast('暂无更多数据');
			    			return;
			    		}
			    		if(_that.currentPageForApp == 1){
			    			_that.shop = DpGoodsList;
			    		}else{
			    			_th
			    			at.shop = _that.shop.concat(DpGoodsList);
			    		}
			    		_that.allLoaded = false;
			    		_that.currentPageForApp++;
			    		
			    	}else{
			    		_that.allLoaded = false;
			    	}
			    	
			  	})
			  	.catch(function (error) {
			  		_that.ajaxStatus = true;
			  		_that.allLoaded = false;
			  		Indicator.close();
			    	console.log(error);
				});
			},
			btn(){
			 	
			},
			show (msg) {
				console.log(this.$modal);
			    this.$modal.show(msg);
			},
			loadTop() {
				this.currentPageForApp = 1;
				this.getList();
				this.allLoaded = true;
			  	this.$refs.loadmore.onTopLoaded();
			},
			loadBottom(){
				this.getList();
				this.$refs.loadmore.onBottomLoaded();
			},
			handleBottomChange(status) {
		        this.bottomStatus = status;
		    },
		    cancleaddress(){
				this.popupVisible = false;
			},
			selectaddress(){
				const val = this.loadInputValue(this.addressList);
				this.address[2]['val'] = val;
				this.popupVisible = false;
			},
		},
		components:{
			search,
			square,
			vPhone,
			shop,
			Loadmore,
			bottom,
			indexTitle,
			goodQuantity,
			mtPopup: Popup,
			noData,
		},
		watch: {
			shop(val,oldval){
				if(val.length != 0){
					this.goodnoshop.show = false;
				}else{
					this.goodnoshop.show = true;
				}
			}
		}
	}
</script>

<style scoped>
	.shopcontent {
		
	}
	.indexshopList {
		height:200px;
		border-top: 1px solid #f2f2f2;
		box-sizing: border-box;
	}
	
	.mint-loadmore-text {
		font-size: 0.375rem;
	}
	.mint-popup-4 {
		width: 100%;
	}
	.mint-datetime-action {
		color: #fc2a2e;
	}
</style>