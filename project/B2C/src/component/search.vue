<template>
	<div class="search">
		<i class="iconfont_search iconfont icon-serch1"></i>
		<input v-model="searchWord" placeholder="搜索" type="text" />
		<span @click="search()">搜索</span>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex';
	import { Toast } from 'mint-ui';
	export default {
		data(){
			return {
				
			}
		},
		computed: {
            ...mapState({
            	searchWord: state => state.searchWord,
            }),
            searchWord:{
                // getter
                get: function () {
                    return this.$store.state.searchWord;
                },
                // setter
                set: function (newValue) {
                    this.$store.state.searchWord = newValue;
                }
            },
        },
		created(){
			
		},
		mounted(){
			
		},
		methods: {
			search(){
				if(this.searchWord == ''){
					Toast('请输入搜索词');
					return;
				}
				this.$store.commit('INCREMENT', {
				  searchWord: this.searchWord
				})
				this.$router.push({name:'searchResult'});
				this.$router.push({name:'searchResult'});
			}
		}
	}
</script>

<style scoped>
	.search {
		position: relative;
		width: 94%;
		padding: 0.3rem 3%;
		line-height: 1rem;
		background: #fff;
		font-size: 0.375rem;
		z-index: 3000;
	}
	.iconfont_search {
		position: absolute;
		top: 0.2rem;
		left: 0.5rem;
		color: #989A9C;
	}
	.search input {
		float: left;
		width: 70%;
		height: 0.47rem;
		line-height: 0.5rem;
		padding: 0.125rem 8px;
		padding-top: 0.20rem;
		padding-left: 0.9rem;
		border-radius: 4px;
		background:#f0f0f0;
		font-size: 0.437rem;
		color: #999;
	}
	.search span {
		float: right;
		height: 0.625rem;
		line-height: 0.625rem;
		padding: 0.031rem 8px;
		padding-top: 0.075rem;
		border-radius: 3px;
		color: #FC2A2E;
		border: solid 0.031rem #FC2A2E;
	}
</style>