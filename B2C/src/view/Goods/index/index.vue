<template>
	<div class="goods">
		<search></search>
		<div class="goodsContent">
			<div class="goodsLeft">
				<ul :class="{psoi: popupVisible}" class="goodsLeft_first">
					<li @click="getSend($event,index)" :class="{'active':tode.active}" v-for="(tode,index) in classification_first">
						{{tode.className}}
					</li>
				</ul>
				<mt-popup v-model="popupVisible" position="left" class="mint-popup-4">  
		          	<ul :style="{top: position.clientY + 'rem'}" class="goodsLeft_send">
						<li @click="getClassMessage(index)" :class="{'active':tode.active}" v-for="(tode,index) in classification_send">
							{{tode.className}}
						</li>
					</ul>
		        </mt-popup>
				
			</div>
			<div class="goodsRight">
				<!--<ul>
					<li v-for="(tode,index) in getgGoodClassList">
						<router-link :to="{name:'goodDetail',params: {id: tode.guid}}">
							<img :src="tode.netUrl" />
							<span>{{tode.className}}</span>
						</router-link>
					</li>
					<div style="clear: both;"></div>
				</ul>-->
				<div v-if="list" class="indexshopList" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<Loadmore :top-method="loadTop" :bottom-dropped="dropped" :bottom-method="loadBottom" :bottom-distance ="Distance"  @bottom-status-change="handleBottomChange"  :bottom-all-loaded="allLoaded" :auto-fill="fill" ref="loadmore">
						<ul>
							<li v-for="(tode,index) in getgGoodClassList">
								<router-link :to="{name:'goodDetail',params: {id: tode.guid}}">
									<img :src="tode.netUrl" />
									<span>{{tode.className}}</span>
								</router-link>
							</li>
							<div style="clear: both;"></div>
						</ul>
					</Loadmore>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex';
	import { Indicator,Popup,Loadmore } from 'mint-ui';
	import {getGoodClass,goodClassList} from 'common/path';
	import search from 'component/search';
	import bottom from 'component/bottom';
	import { wind } from 'common/public';
	export default {
		data(){
			return {
				'index': this.$route.params.id == -1 ? this.$route.params.id = 0 : this.$route.params.id - 1,
				'SendID': 0,
				'prevSendID': 0,
				'classification_send': [],
				'getgGoodClassList':[],
				'popupVisible': false,
				'position': {
					'clientX': '',
					'clientY': 50,
				},
				'list': true,
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
		computed: {
            ...mapState({
            	classification_first: state => state.classification_first,
            	classification_first_status: state => state.classification_first_status,
            }),
        },
		created(){
			this.$store.commit('INCREMENT', {
			    navIndex: 1
			})
			//console.log(this.classification_first);
			const guid = this.getGuid(this.index);
			//this.getGoodClassList(guid);
			//this.getGoodClass(guid);
			//this.classification_first[this.index]['active'] = true;
			this.setUpEvery(this.classification_first,this.index);
			//this.getClassData(this.index);
			
			
		},
		mounted(){
			this.wrapperHeight = 230 * 2;
		},
		methods: {
			getGoodClass(guid){
				const _that = this;
				const obj = {
					goodClassId: guid
				}
				this.$http.post(getGoodClass,wind.stringify(obj))
			    .then(function (response) {
			    	const data = response.data;
			    	if(data.success == 1000){
			    		const GoodClassification = data.GoodClassification;
			    		_that.classification_send = GoodClassification;
			    		_that.getGoodClassList(0);
			    		_that.setUpFirstActive(_that.classification_send,0,_that.prevSendID);
			    	}
			  	})
			  	.catch(function (error) {
			    	console.log(error);
				});
			},
			getGoodClassList(firstID,sendID){
			
				/*const guid = this.getGuid(this.index);
				
				const classGuid = this.getClassGuid(event);*/
				const _that = this;
				if(this.currentPageForApp != 1 && this.allLoaded ){
					Toast('暂无更多数据') 
					return;
				}
				this.allLoaded = true;
				const obj = {
					pClassId: firstID,
				    childClassId: sendID,
				    currentPageForApp: this.currentPageForApp,
				    showCount: this.showCount,
				}
				this.$http.post(goodClassList,wind.stringify(obj))
			    .then(function (response) {
			    	Indicator.close();
			    	const data = response.data;
			    	if(data.success == 1000){
			    		
			    		const GoodClassification = data.GoodClassification;
			    		const DpGoodsList = data.DpGoodsList;
			    		
			    		if(DpGoodsList.length == 0){
			    			_that.allLoaded = true;
			    			Toast('暂无更多数据');
			    			return;
			    		}
			    		if(!sendID){
			    			_that.classification_send = GoodClassification;
			    		}
			    		if(_that.currentPageForApp == 1){
			    			_that.getgGoodClassList = DpGoodsList;
			    			
			    		}else{
			    			_that.getgGoodClassList = _that.getgGoodClassList.concat(DpGoodsList);
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
			setUpEvery(obj,id){
				const arr_id = obj.slice(id,id+1)[0];
				for(const i in obj){
					if(obj[i]['active']){
						this.$set(obj[i],'active',false);
					}
				}
				arr_id.active = true;
				this.$set(obj,id,arr_id);
			},
			setUpFirstActive(obj,id,sendID){
				const arr_id = obj.slice(id,id+1)[0];
				const arr_sendID = obj.slice(sendID,sendID+1)[0];
				arr_sendID.active = false;
				arr_id.active = true;
				this.$set(obj,sendID,arr_sendID);
				this.$set(obj,id,arr_id);
			},
			getSend(e,event){
				const ClientRect = e.currentTarget.getBoundingClientRect();
				this.position.clientX = ClientRect.left;
				this.position.clientY = ClientRect.top/32 - 1.394;
				this.popupVisible = true;
				if(this.index == event) return;
				this.index = event;
				this.currentPageForApp = 1;
				const guid = this.getGuid(event);
				this.getGoodClassList(guid);
				this.$router.push({name:'goods',params: {id: this.index + 1}});
			},
			getClassMessage(event){
				this.popupVisible = false;
				
				//if(this.prevSendID == event) return;
				const guid = this.getGuid(this.index);
				const classGuid = this.getClassGuid(event);
				this.currentPageForApp = 1;
				this.getGoodClassList(guid,classGuid);//二级数据请求
				this.setUpFirstActive(this.classification_send,event,this.prevSendID);
				this.prevSendID = event;
			},
			lookSearch(){
				this.$http.post(getGoodClass)
			    .then(function (response) {
			    	
			  	})
			  	.catch(function (error) {
			    	console.log(error);
				});
			},
			getClassData(val){
				this.index = val;
				const guid = this.getGuid(this.index);
				this.getGoodClass(guid);
			},
			getGuid(index){
				return this.classification_first[index]['guid'];
			},
			getClassGuid(index){
				return this.classification_send[index]['guid'];
			},
			btn(){
				this.$http.get('/Home/Test/index')
			    .then(function (response) {
			    	
			  	})
			  	.catch(function (error) {
			    	console.log(error);
				});
			},
			loadTop() {
				this.currentPageForApp = 1;
				this.getGoodClassList(this.index);
				this.allLoaded = true;
			  	this.$refs.loadmore.onTopLoaded();
			},
			loadBottom(){
				this.getGoodClassList(this.index);
				this.$refs.loadmore.onBottomLoaded();
			},
			handleBottomChange(status) {
		        this.bottomStatus = status;
		    },
		},
		watch: {
			classification_first_status(val,oldval){
				val == -1 ? val=0 : val--;
				oldval == -1 ? oldval=0 : oldval--;
				this.prevSendID = 0;
				//this.getClassData(val);
				this.setUpFirstActive(this.classification_first,val,oldval);
			}
		},
		components:{
			search,
			bottom,
			mtPopup: Popup,
			Loadmore,
		}
	}
</script>

<style scoped>
	.goods {
		
	}
	.goodsContent {
		margin-top: 0.218rem;
	}
	.goodsLeft {
		position: relative;
		float: left;
		width: 2.4rem;
		font-size: 0.437rem;
		font-size: 0.406rem;
	}
	.goodsLeft_first,.goodsLeft_send {
		width: 2.4rem;
	}
	.goodsLeft_first {
		position: relative;
		float: left;
		z-index: 9;
		background: #f0f0f0;
	}
	.goodsLeft_send {
		position: absolute;
		top: 0.219rem;
		left: 2.4rem;
		background: #fff;
	}
	.goodsLeft li {
		height: 1.624rem;
		line-height: 1.624rem;
		text-align: center;
	}
	.goodsLeft_first li {
		color: #333333;
		border-bottom: solid 1px #f3f3f3;
	}
	.goodsLeft_send li {
		border-bottom: solid 1px #fff;
	}
	.goodsLeft_first .active {
		color: #FC2A2E;
		background: #fff;
	}
	.goodsRight {
		float: left;
		width: 7.6rem;
		min-height: 12.5rem;
		padding: 0.5rem 0;
		font-size: 0.437rem;
		text-align: center;
		background: #fff;
	}
	.goodsRight ul {
		width: 94%;
		margin-left: 6%;
		margin-right: 0%;
	}
	.goodsRight ul li {
		float: left;
		width: 30%;
		margin-left: 1%;
	}
	.goodsRight ul li a {
		width: 100%;
	}
	.goodsRight ul li img {
		width: 2.156rem;
		height: 1.406rem;
	}
	.mint-popup {
		top: 1.39066rem
	}
	.psoi {
		z-index: 3000;
	}
</style>