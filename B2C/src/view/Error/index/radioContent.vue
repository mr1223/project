<template>
	<div class="content">
		<label v-for="">
			<input class="radio-input" type="radio" name="radio" />
			<span class="radioStyle">
				
			</span>
			<slot>666</slot>
		</label>
	</div>
</template>

<script>

	export default {
		props: {
			'select':null
		},
		created(){},
		mounted(){},
		
	}
</script>

<style scoped>
	.content {
		padding: 2rem;
	}
	.radioStyle {
		display: inline-block;
		position: relative;
		width: 20px;
		height: 20px;
		border-radius: 100%;
		background: #FC2A2E;
		border: 0;
	}
	.radioStyle::after {
		content: '';
		display: inline-block;
		position: absolute;
		top: 5px;
		left: 5px;
		width: 10px;
		height: 10px;
		border-radius: 100%;
		border: 0;
		-webkit-transition: -webkit-transform .2s;
	    transition: -webkit-transform .2s;
	    transition: transform .2s;
	    transition: transform .2s, -webkit-transform .2s;
	    -webkit-transform: scale(0);
        transform: scale(0);
	}
	.radio-input:checked + .radioStyle::after {
		background: #fff;
		transform: scale(1);
	}
</style>