let x = 11;
let y = .5;
let z = 0;
let cam;
let a = 5;
let b = 33;
let c = 8 / 3;
let rot = 0;
let hue = 0;
let aslider;
let bslider;
let points = [];

function setup() {
	createCanvas(600, 300, WEBGL);
	background(0);
	//	camera(-200, 33, -100, width / 2, height / 2, 12, 11, 0, 0);
	textureMode(NORMAL);
	angleMode(DEGREES);
	colorMode(HSB);
	aslider = createSlider(0, 30, 10, 1);
	bslider = createSlider(0, 50, 33, 1);
}

function draw() {
	orbitControl(1, 1);
	rot = rot + .01;
	background(0);

	a = aslider.value();
	b = bslider.value();
	let dt = .01;
	let dx = (a * (y - x)) * dt;
	x = x + dx;
	let dy = (x * (b - z) - y) * dt;
	y = y + dy;
	let dz = (x * y - c * z) * dt;
	z = z + dz;
	let v = createVector(x, y, z);
	let f = v.copy();
	points.push(f);
	scale(2);
	noFill();
	//beginShape();
	rotateZ(rot);
	hue = 0;
	for (let p = 0; p < points.length - 1; p++) {

		// console.log(points[p].x);
		drawLine(points[p].x, points[p].y, points[p].z, points[p + 1].x, points[p + 1].y, points[p + 1].z)
		//	vertex(points[p].x, points[p].y, points[p].z);
		hue = hue + 1;
		if (hue > 255) {
			hue = 0;
		}
	}
	//	endShape();
	//strokeWeight(2);
	//translate(width / 2, height / 2);

}

function drawLine(x1, y1, z1, x2, y2, z2) {
	beginShape();
	stroke(hue, 255, 255);
	vertex(x1, y1, z1);
	vertex(x2, y2, z2);
	endShape();
}