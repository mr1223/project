import BarChart from '../BaseCharts/Bar'

export default BarChart.extend({
	props:{
		testData:null
	},
  mounted () {
  	//this.$props.testData
  	var _that = this;
    this.renderChart(this.$props.testData, {responsive: true, maintainAspectRatio: false})
  }
})
