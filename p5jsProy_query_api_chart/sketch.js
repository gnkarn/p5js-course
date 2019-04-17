// ejemplo con chart JS
// hacer cosas muy simples es demasiado complejo 


// Global variables
let puntos = [];
let datos = [];
var plot1 = undefined;
var plot2 = undefined;
let meta = []; // metadatos

function preload() {
	API_BASE_URL = "https://apis.datos.gob.ar/series/api/";
	//	let id = "ids=101.1_I2NG_2016_M_22";
	//	let representation_mode = ":percent_change_a_year_ago";
	let id = "ids=116.3_TCREU_0_M_31"
	let representation_mode = ":value";
	let form = "&format=json";
	// let collapse= ;
	// let collapse_aggregation;
	// let metadata ;
	let start_date = "&start_date=2017-01";
	let decimal = "&decimal=."
	let url1 = API_BASE_URL + "/series/?" + id + representation_mode + start_date + form + decimal;
	let url2 = API_BASE_URL + "/series/?ids=168.1_T_CAMBIOR_D_0_0_26&start_date=2018-07&limit=1000";
	loadJSON(url1, gotData);
}

function gotData(data) {

	// deberia mapear todos los campos del objeto meta
	meta[1] = data.meta[1].field.description;
	meta[0] = data.meta[0].frequency;
	meta[2] = data.meta[1].field.units;
	console.log(meta[1]);
	console.log(meta[0]);
	datos = data;
}

function setup() {
	// var ctx = document.getElementById('myChart').getContext('2d');
	// var myChart = new Chart(ctx, {
	// 	type: 'bar',
	// 	data: {
	// 		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	// 		datasets: [{
	// 			label: '# of Votes',
	// 			data: [12, 19, 3, 5, 2, 3],
	// 			backgroundColor: [
	// 				'rgba(255, 99, 132, 0.2)',
	// 				'rgba(54, 162, 235, 0.2)',
	// 				'rgba(255, 206, 86, 0.2)',
	// 				'rgba(75, 192, 192, 0.2)',
	// 				'rgba(153, 102, 255, 0.2)',
	// 				'rgba(255, 159, 64, 0.2)'
	// 			],
	// 			borderColor: [
	// 				'rgba(255, 99, 132, 1)',
	// 				'rgba(54, 162, 235, 1)',
	// 				'rgba(255, 206, 86, 1)',
	// 				'rgba(75, 192, 192, 1)',
	// 				'rgba(153, 102, 255, 1)',
	// 				'rgba(255, 159, 64, 1)'
	// 			],
	// 			borderWidth: 1
	// 		}]
	// 	},
	// 	options: {
	// 		scales: {
	// 			yAxes: [{
	// 				ticks: {
	// 					beginAtZero: true
	// 				}
	// 			}]
	// 		}
	// 	}
	// });
	let punto = {
		x: "1900-01-01",
		y: 0
	};

	console.log(datos);
	for (let i = 0; i < datos.data.length; i++) {

		puntos[i] = {
			x: datos.data[i][0],
			y: datos.data[i][1]
		};
		//console.log(punto);
	}
	console.log(puntos);


	var ctx = document.getElementById('myChart').getContext('2d');
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: puntos.x,
			datasets: [{
				fill: false,
				label: 'Page Views',
				data: puntos.y,
				borderColor: '#fe8b36',
				backgroundColor: '#fe8b36',
				lineTension: 0,
			}]
			
		},
		options: {
			title: {
					display: true,
					text: meta[1]},
			tooltips: {
				mode: 'point'
			},
			scales: {
				xAxes: [{
					type: 'time',
					scaleLabel: {
						display: true,
						labelString: "Date",
					},
					distribution: 'series',
					bounds: 'data',
					time: {
						unit: 'month'

					}
				}]
			}
		}
	});

}