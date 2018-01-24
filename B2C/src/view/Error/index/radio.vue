<template>
	<div>
		<radio-content :select="select">
			
			<div>
				7777
			</div>
		</radio-content>
		<mt-radio
		  title="radio list"
		  v-model="value"
		  :options="['optionA', 'optionB', 'optionC']">
		</mt-radio>
		<!--<mt-checklist
		  title="checkbox list"
		  v-model="values"
		  :options="['optionA', 'optionB', 'optionC']">
		</mt-checklist>-->
	</div>
</template>

<script>
	import { Radio,Checklist  } from 'mint-ui';
	import radioContent from './radioContent'
	export default {
		data(){
			return {
				'select': 0,
				'value': 'optionA',
				'values': 'optionB',
				
			}
		},
		created(){},
		mounted(){},
		components: {
			radioContent,
			mtRadio:Radio,
			mtChecklist: Checklist,
		},
	}
</script>

<style>
</style>