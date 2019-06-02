// https://data.giss.nasa.gov/gistemp/
// cCARGA  la  TEMPERATURA PROMEDIO DEL MAR registrada en la historia
let ctx;

function setup() {
	//var ctx = document.getElementById('myChart').getContext('2d');
	ctx = createCanvas(400, 400);
	chartIt();
}

async function getData() {
	const ys = [];
	const xs = [];

	const response = await fetch('ZonAnn.Ts+dSST.csv');
	const data = await response.text();
	//console.log(data);

	let table = data.split('\n'); // l;o separa en un array por filas

	table = table.slice(1); // elimino el encabezado
	//console.log(table);

	table.forEach(row => {
		const columns = row.split(',');
		const year = columns[0];
		const temp = columns[1];
		xs.push(year);
		ys.push(14 + parseFloat(temp));
		//	console.log(year, ytemp);
	})
	return {xs,ys};
}

async function chartIt( ) {
	const data = await getData(); // la funcion retorna un objeto con los valores de x e y 
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.xs,
			datasets: [{
				label: 'temperatura Global media',
				data: data.ys,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: { 						
						callback: function (value,index,values){ // toma el valor y lo reemplazo por el valor y el simbolo
							return value + 'º';
						}
					}
				}]
			}
		}
	});
}

function draw() {

}