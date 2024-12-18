<template>
	<div>
		<apexchart  type="donut" :options="options" :series="series"></apexchart>
	</div>
</template>
<script>
	import VueApexCharts from "vue3-apexcharts";
	export default {
		name: 'HighchartsComponent',
		components: {
			apexchart: VueApexCharts,
		},
		data() {
			return {
				options: {},
				series: [44, 55, 41, 17, 15]
			}	
		},
		created() {
			// this.chartOptions.xaxis.categories = ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'];
			// this.series[0].data = [6500, 6418, 6456, 6526, 6356, 6456];
			// this.series[0].name = "New users";
		},
		methods: {
			alert(){ 
				// console.log('alert');
				alert('hola')
			}
		},
	}
</script>