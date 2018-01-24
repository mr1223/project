<template>
	<div class="phone">
		<img v-if="tell.banner" :src="tell.banner" />
		<a :href="'tel:' + tell.phone">{{tell.phone}}</a>
	</div>
</template>

<script>
	export default {
		data(){
			return {}
		},
		props:{
			tell: null
		}
	}
</script>

<style scoped>
	.phone {
		width: 100%;
		font-size: 0.5rem;
	}
	.phone img { 
		width: 100%;
	}
	.phone {
		text-align: center;
	}
</style>