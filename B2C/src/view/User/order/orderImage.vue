<template>
	<div class="orderImage">
		<div class="evaluate_addImage">
			<div v-for="(tode,index) in imageContent" class="evaluate_imageCon">
				<img :src="tode.netUrl" />
				<i @click="remove(index)" class="iconfont icon-close"></i>
			</div>
			<div v-if="add" @click="addImage" class="evaluate_add">
				<i class="iconfont icon-xcarma"></i>
				<span>添加图片</span>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div>
			<!--<input hidden id="camera" type="file" @change="upload();" accept="image/*" capture="camera"/>-->
			<input hidden id="photo" type="file" @change="uploads();" accept="image/*" multiple/>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data(){
			return {
				/*'imageContent': [
					{
						"netUrl": "https://ekuakao.oss-cn-beijing.aliyuncs.com/dp/goods/d7f6badab37e4ea58a862c852f852d76_1.jpg?Expires=3092467231&OSSAccessKeyId=LTAI3o1OZHRkwtpw&Signature=6WuXtfcv7yMMxQifUInBrNbL3DI%3D&code=1515667231051",
						"active": true,
						"id": 1,
					},
				],*/
			}
		},
		props: {
			'imageContent': null,
			'add': null,
		},
		computed: {
            ...mapState({
            	ids: state => state.ids,
            }),
            ids:{
                // getter
                get: function () {
                    return this.$store.state.ids;
                },
                // setter
                set: function (newValue) {
                    this.$store.state.ids = newValue;
                }
            },
        },
		created(){
				
		},
		methods: {
			addImage(){
					document.getElementById('photo').click();
			},
			change(){
				console.log(666);
			},
			remove(e){
				this.imageContent.splice(e,1);
				const ids = this.getImgId(this.imageContent);
				
				this.$store.commit('INCREMENT', {
				    ids: ids
				})
				
			},
			getImgId(obj){
				if(obj.length < 1 ) return;
				var ids = '';
				for(var i = 0; i < obj.length; i++){
					if(i == 0){
						ids = obj[i]['id'];
					}else{
						ids += ',' + obj[i]['id'];
					}
				}
				return ids;
			},
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.orderImage {
		background: #fff;
	}
	.evaluate_addImage {
		padding: 0.2rem 0.2rem 3rem 0.4rem;
		font-size: 0.375rem;
		text-align: center;
	}
	.evaluate_add,.evaluate_imageCon {
		position: relative;
		float: left;
		margin-bottom: 0.4rem;
		margin-right: 0.2rem;
		width: 2.15rem;
		height: 2.15rem;
		background: #F7F7F7;
		color: #A3A3A3;
	}
	.evaluate_addImage i {
		display: inline-block;
		margin-top: 0.4rem;
	}
	.evaluate_addImage span {
		display: block;
		margin-top: 0.2rem;
	}
	.evaluate_imageCon {
		display: table-cell;
		vertical-align: middle;
	}
	.evaluate_imageCon img {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		max-width: 100%;
		max-height: 100%;
		vertical-align: middle;
	}
	.evaluate_imageCon i {
		position: absolute;
		right: -0.12rem;
		top: -0.2rem;
		color: #FC2A2E;
		margin-top: 0;
	}
</style>