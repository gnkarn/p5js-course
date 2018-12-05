// ver ejemplo 9.15 

var rows = 10;
var cols = 10;

var colors = [];
// crea el array 2d para la matriz
function make2Darray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function setup() {
	createCanvas(300, 300);
	colors=make2Darray(cols,rows);
	background(0);
	fill(200);
	stroke(255);

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			colors[i][j]= random(0, 255);
		}
	}
}

function draw() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			fill(colors[i][j]);
			rect(i * 30, j * 30, 30, 30);
		}
	}
}