// https://apis.datos.gob.ar/series/api/series/?ids=101.1_I2NG_2016_M_22:percent_change_a_year_ago&format=json
//https://apis.datos.gob.ar/series/api/series/?ids=168.1_T_CAMBIOR_D_0_0_26&start_date=2018-07&limit=1000

// usa librebria de p5js Grafica ( parece muy , limitada 

// var sketch = function (p) {
// Global variables
var datos = [];
var plot1 = undefined;
var plot2 = undefined;
let meta = []; // metadatos

function preload() {
	API_BASE_URL = "https://apis.datos.gob.ar/series/api/";
	//	let id = "ids=101.1_I2NG_2016_M_22";
	//	let representation_mode = ":percent_change_a_year_ago";
	//let id = "ids=116.3_TCREU_0_M_31"
	//let id = "ids=103.1_I2N_2016_M_19";

	let id = "ids=174.1_RRVAS_IIOS_0_0_60";// reservas diarias

	let representation_mode = ":value";
	let form = "&format=json";
	// let collapse= ;
	// let collapse_aggregation;
	// let metadata ;
	let end_date = "&end_date="+ year()+"-"+month();
	let start_date = "&start_date=2011-01";
	let decimal = "&decimal=.";
	// ojo este query solo trae 100 datos ( ver porque).
	let url1 = API_BASE_URL + "/series/?" + id + representation_mode + start_date + end_date+ form + decimal;
	//let url2 = API_BASE_URL + "/series/?ids=168.1_T_CAMBIOR_D_0_0_26&start_date=2018-07&limit=1000";
	loadJSON(url1, gotData);
	console.log(url1);
	text
}

function gotData(data) {
	console.log(data);
	for (let i = 0; i < data.data.length; i++) {
		datos[i] = data.data[i][1];
		console.log(datos[i]);

	}

	// deberia mapear todos los campos del objeto meta
	meta[1] = data.meta[1].field.description;
	meta[0] = data.meta[0].frequency;
	meta[2] = data.meta[1].field.units;
	console.log(meta[1]);
	console.log(meta[0]);
}
// Initial setup
// p.setup = function () {
function setup() {
	var points;
	// let url = "https://apis.datos.gob.ar/series/api/series/?ids=101.1_I2NG_2016_M_22:percent_change_a_year_ago&format=json"
	// loadJSON(url, gotData);
	// Create the canvas
	createCanvas(500, 350);

	// Create the first plot
	plot1 = new GPlot(this);
	plot1.setPos(0, 0);
	plot1.setMar(60, 70, 40, 70);
	plot1.setOuterDim(width, height);
	plot1.setAxesOffset(4);
	plot1.setTicksLength(4);

	// Create the second plot with the same dimensions
	plot2 = new GPlot(this);
	plot2.setPos(plot1.getPos());
	plot2.setMar(plot1.getMar());
	plot2.setDim(plot1.getDim());
	plot2.setAxesOffset(4);
	plot2.setTicksLength(4);

	// Prepare the points
	points = [];

	for (i = 0; i < datos.length; i++) {
		points[i] = new GPoint(i, datos[i]);
		//	points[i] = new GPoint(i, 30 + 10 * p.noise(i * 0.1));
	}

	// Set the points, the title and the axis labels
	plot1.setPoints(points);
	plot1.setTitleText(meta[1]);
	plot1.getYAxis().setAxisLabelText(meta[2]);
	plot1.getXAxis().setAxisLabelText(meta[0]);

	plot2.getRightAxis().setAxisLabelText("T (Kelvin)");

	// Make the right axis of the second plot visible
	plot2.getRightAxis().setDrawTickLabels(true);

	// Activate the panning (only for the first plot)
	plot1.activatePanning();
};

// Execute the sketch
function draw() {
	// Clean the canvas
	background(200);

	// Draw the plot
	plot1.beginDraw();
	plot1.drawBox();
	plot1.drawXAxis();
	plot1.drawYAxis();
	plot1.drawTitle();
	plot1.drawPoints();
	plot1.drawLines();
	plot1.endDraw();

	// Change the second plot vertical scale from Celsius to Kelvin
	plot2.setYLim(celsiusToKelvin(plot1.getYLim()));

	// Draw only the right axis
	plot2.beginDraw();
	plot2.drawRightAxis();
	plot2.endDraw();
};

//
// Transforms from degree Celsius to degree Kelvin
//
function celsiusToKelvin(celsius) {
	var kelvin = [];

	for (var i = 0; i < celsius.length; i++) {
		kelvin[i] = 273.15 + celsius[i];
	}

	return kelvin;
}

// };

//var myp5 = new p5(sketch);