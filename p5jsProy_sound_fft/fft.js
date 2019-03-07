// Daniel Shiffman
// http://codingtra.in
// Code for: https://youtu.be/2O3nm0Nvbi4
// espectro en barras o circular ( comentado)
// https://p5js.org/reference/#/p5.FFT
// ver draw 3 , circular calculo de energia y centroide de frecuencia
var song;
var fft;
var button;
let w = 256 / 32;// adaptar sehun nro de bins

function toggleSong() {
	if (song.isPlaying()) {
		song.pause();
	} else {
		song.play();
	}
}

function preload() {
	song = loadSound("12 Bedshaped.mp3");
}

function setup() {
	//setInput([unit])//  si no se especifica analiza todo el sonido del sketch
	createCanvas(256, 256);
	colorMode(HSB);
	angleMode(DEGREES);
	button = createButton('toggle');
	button.mousePressed(toggleSong);
	//song.play();
	fft = new p5.FFT(0.7, 64); // smooth y cantidad de bins
	
}
// draw1
// function draw() {
// 	background(0);
// 	var spectrum = fft.analyze();
// 	//console.log(spectrum);
// 	stroke(255);
// 	noStroke();
// 	for (let i = 0; i < spectrum.length; i++) {
// 		let am = spectrum[i];
// 		fill(i*8, 255, 255);
// 		let y = map(am, 0, 256, height, 10);
// 		//console.log(y);
// 		rect(i * w, y, w - 2, height - y);
// 	}

// }
// draw2
// function draw() {
// 	background(0);
// 	var spectrum = fft.analyze();
// 	//console.log(spectrum);
// 	stroke(255);
// 	noStroke();
// 	translate(width / 2, height / 2);
// 	beginShape();
// 	for (let i = 0; i < spectrum.length; i++) {
// 			var angle = map(i, 0, spectrum.length, 0, 360);
// 		let am = spectrum[i];
// 		//console.log(amp);
// 		var r = map(am, 0, 256, 20, 100);
// 		//fill(i * 8, 255, 255);
// 		var x = r * cos(angle);
// 		var y = r * sin(angle);
// 		stroke(i*8, 255, 255);
// 		strokeWeight(4);
// 		//	line(0, 0, x, y);
// 		vertex(x, y);
// 	}
// 	endShape();

// }

// draw 3
function draw() {
	background(10,5);
	var spectrum = fft.analyze();
	// get the centroid
	spectralCentroid = fft.getCentroid();

	//console.log(spectrum);
	stroke(255);
	noStroke();
	push();
	translate(width / 2, height / 2);
	beginShape();
	for (let i = 0; i < spectrum.length; i++) {
		var angle = map(i, 0, spectrum.length, 0, 360);
		let am = spectrum[i];
		//console.log(am);
		var r = map(am, 0, 256, 20, 100);
		//fill(i * 8, 255, 255);
		noFill();
		var x = r * cos(angle);
		var y = r * sin(angle);
		stroke(i * 8, 255, 255);
		strokeWeight(4);
		line(0, 0, x, y);
		stroke(200);
		strokeWeight(2);
		vertex(x, y);
		//let y = map(am, 0, 256, height, 10);
		//console.log(y);
		//	rect(i * w, y, w - 2, height - y);
	}
	
	endShape();
	let ener = fft.getEnergy(200, 20000);
	textSize(12);
	strokeWeight(1);
	stroke(255);
	fill(255);
	text("centroid: " + round(spectralCentroid) + " Hz", -50, 100);
	pop();
		rect(10, height-20, ener, 10);
}