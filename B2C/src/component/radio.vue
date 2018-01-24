<template>
	<div class="radio">
		<input :name="name" :checked="checked" :value="value" @click="setUpStyle" class="payStyleListActives-input" type="radio" />
		<span class="payStyleListActives"></span>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				checked: false
			}
		},
		props: {
			'SELECTVALUE': null,
			'name': null,
			'value': null
		},
		created(){
			if(SELECTVALUE == value){
				this.checked = true;
			}
		},
		methods: {
			setUpStyle(e){
				console.log(e.target.value);
				
			}
		},
		components:{
			
		}
	}
</script>

<style scoped>
	.radio {
		float: left;
	}
	.payStyleListActives {
		box-sizing: border-box;
	    display: inline-block;
	    background-color: #fff;
	    border-radius: 100%;
	    border: 1px solid #ccc;
	    position: relative;
	    width: 20px;
	    height: 20px;
	    vertical-align: middle;
	}
	.payStyleListActives::after {
		content: " ";
	    border-radius: 100%;
	    top: 5px;
	    left: 5px;
	    position: absolute;
	    width: 8px;
	    height: 8px;
	    -webkit-transition: -webkit-transform .2s;
	    transition: -webkit-transform .2s;
	    transition: transform .2s;
	    transition: transform .2s, -webkit-transform .2s;
	    -webkit-transform: scale(0);
        transform: scale(0);
	}
	.payStyleListActives-input:checked + .payStyleListActives {
	    background-color: #26a2ff;
	    border-color: #26a2ff;
	}
	.payStyleListActives-input:checked + .payStyleListActives::after {
	    background-color: #fff;
	    -webkit-transform: scale(1);
	    transform: scale(1);
	}
</style>