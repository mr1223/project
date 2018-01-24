<template>
	<div class="goodEvaluate">
		<div class="goodEvaluateTable">
			<span :class="{active: tode.active}" @click="setTable(index)" v-for="(tode,index) in EvaluateTitle">
				<i :class="{'icon-Fillgou': tode.active}" class="iconfont"></i>
				{{tode.name}}
			</span>
			<div style="clear: both;"></div>
		</div>
		<mt-tab-container v-model="active" :swipeable="true">
		  	<mt-tab-container-item id="tab-container1">
		    	<!--<mt-cell v-if="evaluations_show" v-for="(tode,index) in evaluations">
		    		<div class="evaluateList">
		    			<shop-user-message :message="tode"></shop-user-message>
		    			<good-evaluate-image :Image="tode.images"></good-evaluate-image>
		    		</div>
		    	</mt-cell>-->
		    	<div v-if="evaluations_show" class="indexshopList" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<Loadmore :top-method="loadTop" :bottom-dropped="dropped" :bottom-method="loadBottom" :bottom-distance ="Distance"  @bottom-status-change="handleBottomChange"  :bottom-all-loaded="allLoaded" :auto-fill="fill" ref="loadmore">
						<mt-cell :key="tode" v-for="(tode,index) in evaluations">
				    		<div class="evaluateList">
				    			<shop-user-message :message="tode"></shop-user-message>
				    			<good-evaluate-image :Image="tode.images"></good-evaluate-image>
				    		</div>
				    	</mt-cell>
					</Loadmore>
				</div>
		    	<no-data v-if="!evaluations_show" :goodnoshop="goodnoshop"></no-data>
		  	</mt-tab-container-item>
		  	<mt-tab-container-item id="tab-container2">
		    	<div v-if="goods_evaluations_show" class="indexshopList" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<Loadmore :top-method="loadTop" :bottom-dropped="dropped" :bottom-method="loadBottom" :bottom-distance ="Distance"  @bottom-status-change="handleBottomChange"  :bottom-all-loaded="allLoaded" :auto-fill="fill" ref="loadmore1">
						<mt-cell :key="tode" v-for="(tode,index) in goods_evaluations">
				    		<div class="evaluateList">
				    			<shop-user-message :message="tode"></shop-user-message>
				    			<good-evaluate-image :Image="tode.images"></good-evaluate-image>
				    		</div>
				    	</mt-cell>
					</Loadmore>
				</div>
		    	<no-data v-if="!goods_evaluations_show" :goodnoshop="goodnoshop"></no-data>
		  	</mt-tab-container-item>
		  	<mt-tab-container-item id="tab-container3">
		    	<!--<mt-cell v-if="negative_evaluations_show" v-for="(tode,index) in negative_evaluations">
		    		<div class="evaluateList">
		    			<shop-user-message :message="tode"></shop-user-message>
		    			<good-evaluate-image :Image="tode.images"></good-evaluate-image>
		    		</div>
		    	</mt-cell>-->
		    	<div v-if="negative_evaluations_show" class="indexshopList" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<Loadmore :top-method="loadTop" :bottom-dropped="dropped" :bottom-method="loadBottom" :bottom-distance ="Distance"  @bottom-status-change="handleBottomChange"  :bottom-all-loaded="allLoaded" :auto-fill="fill" ref="loadmore2">
						<mt-cell :key="tode" v-for="(tode,index) in negative_evaluations">
				    		<div class="evaluateList">
				    			<shop-user-message :message="tode"></shop-user-message>
				    			<good-evaluate-image :Image="tode.images"></good-evaluate-image>
				    		</div>
				    	</mt-cell>
					</Loadmore>
				</div>
		    	<no-data v-if="!negative_evaluations_show" :goodnoshop="goodnoshop"></no-data>
		  	</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import { Toast,Indicator,Loadmore,TabContainer,TabContainerItem,Cell } from 'mint-ui';
	import { wind } from 'common/public';
	import {toNumber} from 'common/reg';
	import shopUserMessage from './shopUserMessage';
	import goodEvaluateImage from './goodEvaluateImage';
	import noData from 'component/noData';
	import { evaluationList } from 'common/path';
	export default {
		data(){
			return {
				'EvaluateTitle': [
					{
						'name': '全部',
						'active': true,
					},
					{
						'name': '好评',
						'active': false,
					},
					{
						'name': '差评',
						'active': false,
					},
				],
				'active': 'tab-container1',
				'lastActive': 0,
				'shopDetail': {},
				'shopID': this.$route.params.id,
				'evaluations': [],//评价信息
				'goods_evaluations': [],//好评
				'negative_evaluations': [],//差评
				'evaluations_show': true,
				'goods_evaluations_show': true,
				'negative_evaluations_show': true,
				'goodnoshop': {
					'describe':'暂无数据',
					'show': true,
				},
				'currentPageForApp': 1,
				'showCount': 20,
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
			
		},
		mounted(){
			this.wrapperHeight = 230 * 2;
		},
		methods: {
			getList(){
				const _that = this;
				if(this.currentPageForApp != 1 && this.allLoaded ){
					Toast('暂无更多数据') 
					return;
				}
				this.allLoaded = true;
				//请求评价信息
				
				const evaluation = {
					'currentPageForApp': this.currentPageForApp,
					'showCount': this.showCount,
					'goodsId': this.shopID,
				}
				this.$http.post(evaluationList,wind.stringify(evaluation))
			    .then(function (response) {
			    	Indicator.close();
			    	const data = response.data;
			    	if(data.success == 1000){
			    		const evaluations = data.evaluations;
			    		const goods_evaluations = [];
			    		const negative_evaluations = [];
			    		
			    		for(var i = 0; i < evaluations.length; i++){
			    			if(evaluations[i]['evalLevel'] > 2){
			    				goods_evaluations.push(evaluations[i]);
			    			}else{
			    				negative_evaluations.push(evaluations[i]);
			    			}
			    		}
			    		if(evaluations.length == 0){
			    			_that.allLoaded = true;
			    			Toast('暂无更多数据');
			    			return;
			    		}
			    		if(_that.currentPageForApp == 1){
			    			_that.evaluations = evaluations;
				    		_that.goods_evaluations = goods_evaluations;
				    		_that.negative_evaluations = negative_evaluations;
			    		}else{
			    			_that.evaluations = _that.evaluations.concat(evaluations);
				    		_that.goods_evaluations = _that.goods_evaluations.concat(goods_evaluations);
				    		_that.negative_evaluations = _that.negative_evaluations.concat(negative_evaluations);
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
			    	console.log(error);
				});	
			},
			setTable(event){
				this.EvaluateTitle[this.lastActive]['active'] = false;
				this.EvaluateTitle[event]['active'] = true;
				this.active = 'tab-container' + (event + 1);
				this.lastActive = event;
			},
			loadTop() {
				this.currentPageForApp = 1;
				this.getList();
				this.allLoaded = true;
			  	this.$refs.loadmore.onTopLoaded();
			  	this.$refs.loadmore1.onTopLoaded();
			  	this.$refs.loadmore2.onTopLoaded();
			},
			loadBottom(){
				this.getList();
				this.$refs.loadmore.onBottomLoaded();
				this.$refs.loadmore1.onBottomLoaded();
				this.$refs.loadmore2.onBottomLoaded();
			},
			handleBottomChange(status) {
		        this.bottomStatus = status;
		    },
		},
		components:{
			mtTabContainer: TabContainer,
			mtTabContainerItem: TabContainerItem,
			mtCell: Cell,
			shopUserMessage,
			goodEvaluateImage,
			noData,
			Loadmore,
		},
		watch: {
			active(val,oldval){
				const newVal = val.replace(toNumber,"");
				this.EvaluateTitle[this.lastActive]['active'] = false;
				this.EvaluateTitle[newVal - 1]['active'] = true;
				this.active = 'tab-container' + newVal;
				this.lastActive = newVal - 1;
			},
			evaluations(val,oldval){
				if(val.length != 0){
					this.evaluations_show = true;
				}else{
					this.evaluations_show = false;
				}
			},
			goods_evaluations(val,oldval){
				if(val.length != 0){
					this.goods_evaluations_show = true;
				}else{
					this.goods_evaluations_show = false;
				}
			},
			negative_evaluations(val,oldval){
				if(val.length != 0){
					this.negative_evaluations_show = true;
				}else{
					this.negative_evaluations_show = false;
				}
			},
		}
	}
</script>

<style scoped>
	.goodEvaluate {
		background: #fff;
		font-family: "PingFangSC-Regular","arial, helvetica, sans-serif";
	}
	.goodEvaluateTable {
		padding: 0.4rem  0.3rem;
		font-size: 0.406rem;
	}
	.goodEvaluateTable span {
		float: left;
		width: 2.437rem;
		margin-right: 0.3rem;
		padding: 0.1rem 0;
		border: solid 0.032rem  #BDBDBD;
		border-radius: 0.0625rem;
		color: #666;
		text-align: center;
	}
	.goodEvaluateTable span i { 
		font-size: 0.343rem;
	}
	.goodEvaluateTable .active {
		color: #FC2A2E;
		border: solid 0.032rem  #FC2A2E;
	}
	.evaluateList {
		width: 100%;
		border-top: solid 0.032rem #f2f2f2;
	}
</style>