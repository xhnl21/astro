<template>
	<div>
	  <apexchart type="treemap" :options="options" :series="series"></apexchart>
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
		  legend: {
			show: false,
		  },
		  chart: {
			height: 350,
			type: 'treemap',
		  },
		  title: {
			text: 'Basic Treemap',
		  },
		},
		series: [
		  {
			data: [
			  { x: 'New Delhi', y: 218 },
			  { x: 'Kolkata', y: 149 },
			  { x: 'Mumbai', y: 184 },
			  { x: 'Ahmedabad', y: 55 },
			  { x: 'Bengaluru', y: 84 },
			  { x: 'Pune', y: 31 },
			  { x: 'Chennai', y: 70 },
			  { x: 'Jaipur', y: 30 },
			  { x: 'Surat', y: 44 },
			  { x: 'Hyderabad', y: 68 },
			  { x: 'Lucknow', y: 28 },
			  { x: 'Indore', y: 19 },
			  { x: 'Kanpur', y: 29 },
			],
		  },
		],
	  };
	},
	created() {
	  // Aquí puedes realizar inicializaciones adicionales si es necesario
	},
	methods: {
	  alert() { 
		alert('hola');
	  },
	},
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>