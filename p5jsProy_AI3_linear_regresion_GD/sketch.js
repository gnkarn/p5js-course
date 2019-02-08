// se calcula la derivada del error respecto de m, y b
// y se ajusta m y b, segun el delta calculado
//de esta forma se busca el minimo
// se calculan los residuos, y el error total

var data = []; // van de 0-1 
var m = 1;
var b = 0;
var resi = [];
const learninRate=.1;
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

function gradientDescent() {
	var sumerr=0;
	for (var i = 0; i < data.length; i++) {
		var x = data[i].x;
		var y = data[i].y;
		var guess = m * x + b;
		var error = guess - y;
		var delta_m = -error * x;
		var delta_b = -error;
		m += delta_m*learninRate;
		b += delta_b * learninRate;

		resi[i] = data[i].y - m * data[i].x - b;
		sumerr = sumerr+resi[i]*resi[i];
	}
	return sumerr;

}


function draw() {
	background(5);
	fill(255); // mapeo inversa para dibujar los datos
	var err= gradientDescent()*100;
	textSize(16);

	if (err){text("err: "+nf(err,1,2),width-100,height-100);}
	for (var i = 0; i < data.length; i++) {
		var x = map(data[i].x, 0, 1, 0, width);
		var y = map(data[i].y, 0, 1, height, 0);
		ellipse(x, y, 11, 11);
		//	ellipse(x, y, resi[i] * 100, resi[i] * 100);
		drawLine();
		stroke(120);
		line(0, height - 50, width, height - 50);
		var y = map(resi[i], -1, 1, height, height - 100);
		line(x, height - 50, x, y);
	}

}