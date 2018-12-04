//curvas lisajous con sonido

var f = 10;
var slider;
var amplitude;
var slider2;
var tiempo = 0; // tiempo
var mymic = 0;

function setup() {
	mic = new p5.AudioIn();
	mic.start();

	createCanvas(300, 300);
	slider = createSlider(0, 360, 0, .1);
	ellipse(width / 2, height / 2, 100, 100);
	background(0, 0, 0, 255);
	//stroke(200, 255, 255);
	noStroke();
	fill(0, 0, 200);
	colorMode(HSB, 255,255,255,200);
}

function draw() {
	mymic = mic.getLevel() * 255;
	//print(mymic);
	tiempo = tiempo + .1;
	var angle = 2 * PI * f * tiempo / 360 + mymic;

	var angle2 = angle + slider.value() * 2 * PI / 360;
	var x = (width / 2 + width / 2 * sin(angle));
	var y = height / 2 + height / 2 * cos(angle2);
	background(0, 0, 0, 20);
	ellipse(150 + mymic, 150, mymic, mymic);
	fill(mymic,255,255);
	
	//	print(slider.value());
	point(x, y);
		ellipse(x - 5, y - 5, 5, 5);
}