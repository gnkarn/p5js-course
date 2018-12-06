var r = 100;
var x0 = 0;
var y0 = 0;
var x = 100;
var y = 100;
var angle = 0;

function setup() {
	createCanvas(300, 300);
	background(111);
	stroke(255);
	x0 = width / 2;
	y0 = height / 2;
}

function draw() {
	//background(50,11);
	strokeWeight(5);

	point(x, y);
	angle += .04;
	x = x0 + r * cos(angle);
	y = y0 + r * sin(angle);
	r = r - .2;
	//line(x0, y0, x, y);
	if (r < 0) {
		stroke(200, 20, 0, 30);
	}

	point(x, y);

}