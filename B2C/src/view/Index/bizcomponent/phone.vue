<template>
	<div class="phone">
		<a class="serviceContent" :href="'tel:' + phone">
			<i class="iconfont icon-kefu"></i>
		</a>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				phone: 18910895936
			}
		}
	}
</script>

<style scoped>
	.phone {
		position: fixed;
		right: 0.4rem;
		bottom: 5rem;
		z-index: 11;
	}
	.serviceContent {
		display: block;
		width: 1.5rem;
		height: 1.5rem;
		line-height: 1.5rem;
		background: #FFB634;
		color: #fff;
		border-radius: 50%;
		text-align: center;
		box-shadow:0px 3px 3px #f5c987b0;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
	}
	.serviceContent i {
		font-size: 0.8rem;
	}
</style>