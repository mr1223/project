<template>
	<div class="shopList">
		<div class="content">
			<goodtitle :title="title"></goodtitle>
			<div v-if="!goodnoshop.show" class="indexshopList" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<Loadmore :top-method="loadTop" :bottom-dropped="dropped" :bottom-method="loadBottom" :bottom-distance ="Distance"  @bottom-status-change="handleBottomChange"  :bottom-all-loaded="allLoaded" :auto-fill="fill" ref="loadmore">
					<search-list :list="list"></search-list>
				</Loadmore>
			</div>
			
		</div>
		<noData :goodnoshop="goodnoshop"></noData>
		<bottom></bottom>
		
	</div>
	
</template>

<script>
	import { Toast,Indicator,Loadmore } from 'mint-ui';
	import bottom from 'component/bottom';
	import noData from 'component/noData';
	import goodtitle from './goodTitle';
	import goodcontent from './goodContent';
	import searchList from 'view/Index/bizcomponent/searchList';
	import { shopOrderBuyCount } from 'common/path';
	import { wind } from 'common/public';
	export default {
		data(){
			return {
				'title': '您的常用清单',
				'list': [],
				'goodnoshop': {
					'describe':'您还没有常用的清单',
					'show': false,
				},
				'currentPageForApp': 1,
				'showCount': 10,
				'fill': true,
				'dropped': true,
				'allLoaded': true,
				'Distance': 70,
        		'bottomText': '上拉加载更多...',
        		'wrapperHeight': 0,
        		'bottomStatus': '',
			}
		},
		created(){
			Indicator.open({
			  	text: '加载中...',
			  	spinnerType: 'fading-circle'
			});
			this.$store.commit('INCREMENT', {
			    navIndex: 2
			})
			//this.getList();
		},
		mounted(){
			this.wrapperHeight = 234 * 2;
			
		},
		methods: {
			getList(){
				
				const _that = this;
				if(this.currentPageForApp != 1 && this.allLoaded ){
					Toast('暂无更多数据') 
					return;
				}
				this.allLoaded = true;
				const obj = {
					currentPageForApp: this.currentPageForApp,
					showCount: this.showCount,
				}
				
				this.$http.post(shopOrderBuyCount,wind.stringify(obj))
			    .then(function (response) {
			    	Indicator.close();
			    	const data = response.data;
			    	if(data.success == 1000){
			    		const list = data.goodsbuycount;
			    		if(list.length == 0){
			    			_that.allLoaded = true;
			    			
			    			Toast('暂无更多数据');
			    			return;
			    		}
			    		if(_that.currentPageForApp == 1){
			    			_that.list = list;
			    			
			    		}else{
			    			_that.list = _that.list.concat(list);
			    		}
			    		_that.allLoaded = false;
			    		_that.currentPageForApp++;
			    		
			    	}else{
			    		_that.allLoaded = false;
			    	}
			    	
			  	})
			    .catch(function (error) {
			  		_that.allLoaded = false;
			  		Indicator.close();
			    	
				});
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
		},
		components:{
			bottom,
			goodtitle,
			goodcontent,
			noData,
			searchList,
			Loadmore,
		},
		watch: {
			list(val,oldval){
				
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
	.indexshopList {
		background: #fff;
	}
	.content {
		
	}
	.shop_list {
		position: relative;
		margin: 0 auto;
		padding-top: 0.218rem;
		width: 94%;
		border-bottom: solid 1px #ccc;
	}
	.shop_gouwuche {
		position: absolute;
		right: 0.125rem;
		bottom: 0.2rem;
		font-size: 0.8rem;
		color: #fc2a2e;
	}
</style>