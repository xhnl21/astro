<template>
	<div>
		<apexchart width="500" type="line" :options="options" :series="series"></apexchart>
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
				options: {
					chart: {
						id: 'vuechart-example'
					},
					xaxis: {
						categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
					}
				},
				series: [{
					name: 'series-1',
					data: [30, 40, 45, 50, 49, 60, 70, 91]
				}]
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