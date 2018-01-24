<template>
	<div class="goodEvaluate">
		<search></search>
		<search-title :title="title"></search-title>
		<search-list :list="searchlist"></search-list>
		<noData :goodnoshop="goodnoshop"></noData>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import search from 'component/search';
	import noData from 'component/noData';
	import searchTitle from '../bizcomponent/searchTitle';
	import searchList from '../bizcomponent/searchList';
	import { wind } from 'common/public';
	import { goodSearch,goodClassList } from 'common/path';
	export default {
		data(){
			return {
				'searchlist': null,
				'number': 0,
				'title': {
					'name': '共有0个搜索结果',
				},
				'goodnoshop': {
					'show': true,
					'describe':'暂无搜索结果',
				}
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
			const _that = this;
			const obj = {
				searchWord: this.searchWord
			}
			this.$http.post(goodClassList,wind.stringify(obj))
		    .then(function (response) {
		    	const data = response.data;
		    	if(data.success == 1000){
		    		const numbers = data.DpGoodsList.length;
		    		_that.goodnoshop.show = false;
		    		_that.searchlist = data.DpGoodsList;
		    		console.log(_that.searchlist);
		    		_that.title.name= "共有" + numbers + "个搜索结果" ;
		    		console.log(_that.title);
		    	}
		  	})
			
		},
		methods: {
			
		},
		components:{
			search,
			noData,
			searchTitle,
			searchList,
		}
	}
</script>

<style scoped>
	.goodEvaluate {
		background: #fff;
	}
</style>