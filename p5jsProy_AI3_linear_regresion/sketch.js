// clickear en el canvas para ir agregando puntos
// calcula la proximacion lineal y los residuos

var data = []; // van de 0-1 
var m = 1;
var b = 0;
var resi = [];

function setup() {
	createCanvas(400, 400);
	background(51);
}

function mousePressed() {
	var x = map(mouseX, 0, width, 0, 1);
	var y = map(mouseY, 0, height, 1, 0);
	var point = createVector(x, y);
	data.push(point);
}

function drawLine() {
	var x1 = 0;
	var x2 = 1;
	var y1 = m * x1 + b;
	var y2 = m * x2 + b;
	stroke(255, 0, 0);
	x1 = map(x1, 0, 1, 0, width);
	y1 = map(y1, 0, 1, height, 0);
	x2 = map(x2, 0, 1, 0, width);
	y2 = map(y2, 0, 1, height, 0);
	line(x1, y1, x2, y2);
}

function linearRegression() {
	var xm = 0;
	var ym = 0;
	var num = 0;
	var den = 0;
	for (var i = 0; i < data.length; i++) {
		xm += data[i].x;
		ym += data[i].y;
	}
	xm = xm / data.length;
	ym = ym / data.length;
	for (var i = 0; i < data.length; i++) {
		num += (data[i].x - xm) * (data[i].y - ym);
		den += (data[i].x - xm) * (data[i].x - xm);

	}
	m = num / den;
	b = ym - m * xm;
	// calculo de residuos
	for (var i = 0; i < data.length; i++) {
		resi[i] = data[i].y - m * data[i].x - b;

	}

}



function draw() {
	background(44);
	fill(255); // mapeo inversa para dibujar los datos
	linearRegression();
	for (var i = 0; i < data.length; i++) {
		var x = map(data[i].x, 0, 1, 0, width);
		var y = map(data[i].y, 0, 1, height, 0);
		ellipse(x, y, resi[i] * 100, resi[i] * 100);
		drawLine();
		stroke(120);
		line(0,height-50,width,height-50);
		var y = map(resi[i], -1, 1, height , height-100);
		line(x,height-50,x,y);
	}

}