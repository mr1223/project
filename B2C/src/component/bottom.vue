<template>
	<div class="bottom">
		<ul>
			<li @click="navselect(index)" :class="{navSelect: tode.navSelect}" v-for="(tode,index) in nav" :style="{width: 100/nav.length + '%'}">
				<!--<router-link :to="tode.link">-->
					<i :class="tode.icon" class="iconfont"></i>
					<span>{{tode.name}}</span>
				<!--</router-link>-->
			</li>
			<div style="clear: both;"></div>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				"nav": [
					{
						'name': '首页',
						'icon': 'icon-home_red',
						'link': '/',
						'navSelect': false,
					},
					{
						'name': '全部产品',
						'icon': 'icon-quanbushangpin_red',
						'link': '/goods/-1',
						'id': -1,
						'navSelect': false,
					},
					{
						'name': '常用清单',
						'icon': 'icon-changyongqindan_red',
						'link': '/shopList',
						'navSelect': false,
					},
					{
						'name': '购物车',
						'icon': 'icon-gouwuche1',
						'link': '/goodCar',
						'navSelect': false,
					},
					{
						'name': '我的',
						'icon': 'icon-my',
						'link': '/user',
						'navSelect': false,
					},
				]
			}
		},
		computed: {
			...mapState({
				navIndex: state => state.navIndex,
			})
		},
		created(){
			this.nav[this.navIndex]['navSelect'] = true;
		},
		methods: {
			navselect(event){
				this.nav[this.navIndex]['navSelect'] = false;
				this.$store.commit('INCREMENT', {
				    navIndex: event
				})
				const path = this.nav[event]['link'];
				this.$router.push({path: path});
			}
		},
	}
</script>

<style scoped>
	.bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		height: 1.625rem;
		border-top: solid 0.032rem #F2F2F2;
		background: #fff;
		font-size: 0.375rem;
		text-align: center;
		padding-top: 0.156rem;
	}
	.bottom ul li {
		float: left;
	}
	.bottom ul li {
		display: block;
		width: 100%;
		height: 42px;
		color: #999999;
	}
	.bottom ul li i {
		height: auto;
		font-size: 0.6rem;
	}
	.bottom ul li img {
		width: 20px;
		height: 20px;
	}
	.bottom ul li span {
		display: block;
		font-size: 0.375rem;
	}
	.bottom ul .navSelect {
		color: #FC2A2E;
	}
</style>