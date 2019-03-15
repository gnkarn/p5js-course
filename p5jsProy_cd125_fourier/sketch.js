// desarrollo de la funcion cuadrada con sus componentes
// de la serie de Fourier para n variable con slider

let time = 0;
let wave = [];
let slider;

function setup() {
	createCanvas(600, 400);
	colorMode(HSB);
	slider=createSlider(1, 100, 1, 1);
}

function draw() {
	background(0);
	noFill();
	stroke(255);
	translate(100, 200);
	strokeWeight(1);

	let x = 0;
	let y = 0;

	let radius = 0;
	for (let i = 0; i < slider.value(); i++) {

		let n = i * 2 + 1;
		radius = 50 * (4 / (n * PI));
		let prevx = x;
		let prevy = y;
		 push();
		// translate(x, y);
		x += radius * cos(n * time);
		y += radius * sin(n * time);
		strokeWeight(3);
		line(prevx, prevy, x, y); // radio del circulo
		stroke(color(i * 50, 255, 255));
		strokeWeight(1);
		ellipse(prevx,prevy, radius * 2);

		pop();

	}
	wave.unshift(y); // agrega al final del array

	fill(255);
	ellipse(x, y, 10); // punto del circulo

	// segundo circulo


	// sinusoide
	push();
	translate(100, 0);
	beginShape();
	noFill();
	for (let i = wave.length; i > 0; i--) {
		vertex(i, wave[i]);
	}
	endShape();
	pop();
	line(x, y, 100, y); // del circulo a la sinusoide

	if (wave.length > width) {
		wave.pop(); // lo elimina del array 

	}


	time += .02;
	//console.log(wave.length);
}