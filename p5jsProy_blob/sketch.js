// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE
//coding ch #36

var yoff = 0.0;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(0);

	translate(width / 2, height / 2);// para centrarlo

	var radius = 150;

	beginShape();
	var xoff = 0;
	for (var a = 0; a < TWO_PI; a += 0.1) {
		var offset = map(noise(xoff, yoff), 0, 1, -25, 25);
		var r = radius + offset;
		var x = r * cos(a);
		var y = r * sin(a);
		vertex(x, y);
		xoff += 0.3;
		//ellipse(x, y, 4, 4);
	}
	endShape();

	yoff += 0.01;
}