// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/IKB1hWWedMk
// Edited by SacrificeProductions
// https://github.com/CodingTrain/website/blob/master/CodingChallenges/CC_011_PerlinNoiseTerrain/P5/sketch.js
var cols, rows;
var scl = 16; //slider
var w = 1000;
var h = 800;

var flying = 0;
var terrain = [];
var sliderx;
var sliders;

function setup() {
	//noLoop();

	frameRate(50); //slider
	createCanvas(600, 600, WEBGL); //WEBGL
	sliderx = createSlider(0, .5, .08, .01);
	sliders = createSlider(0, 30, 16, 1);
	scl = sliders.value();

	cols = w / scl;
	rows = h / scl;
	strokeWeight(1);
	for (var x = 0; x < cols; x++) {
		terrain[x] = [];
		for (var y = 0; y < rows; y++) {
			terrain[x][y] = 0; //specify a default value for now

		}
	}
}

function draw() {
	scl = sliders.value();
	xoff_inc = sliderx.value();
	flying -= 0.01; //slider

	var yoff = flying;
	for (var y = 0; y < rows; y++) {
		var xoff = 0;
		for (var x = 0; x < cols; x++) {
			terrain[x][y] = map(noise(xoff, yoff), 0, 1, -105, 150); //poner slider
			xoff += xoff_inc; //slider

		}
		yoff += 0.06; //slider
	}
	stroke(0, 11);
	//noStroke();
	background(0);
	translate(0, 50);
	rotateX(PI / 3); // para que parezca visto de arriba ( slider)

	translate(-w / 2, -h / 2); //para que comience de la izquierda y no del centro
	for (var y = 0; y < rows - 1; y++) {
		beginShape(TRIANGLE_STRIP);
		for (var x = 0; x < cols; x++) {
			vertex(x * scl, y * scl, terrain[x][y]);
			vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
			fill(120, 222, 120, terrain[x][y + 1] + 105);
		}
		endShape();
	}
}