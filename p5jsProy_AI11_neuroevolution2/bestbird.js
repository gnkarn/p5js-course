// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&
// la version 1 funciona bien
// esta version esta basada en cc 100.4 part4, se incluye la velocidad y , como input
// y aumenta hlayer  
// muere si toca el piso
// Esta version carga el best bird desde json, y usa su brain

// para usar la version entrenada , habilitar bestbird.js
// en index.html
// para entrenar , usar la version sketch.js junto con el indexLearn.html


const TOTAL = 400; // population
let counter=0;
let bird; // solo cargo el mejor ya entrenado

let pipes = [];
let cycles = 100;
let slider;

let brainJSON;

function preload() {
	brainJSON = loadJSON("bestbird.json");
}

function setup() {
	createCanvas(640, 480);
	slider = createSlider(1, 100, 1);
	let birdBrain = NeuralNetwork.deserialize(brainJSON);
	bird = new Bird(birdBrain);
}

function draw() {
	for (let n = 0; n < slider.value(); n++) {

		if (counter % 75 == 0) {
			pipes.push(new Pipe());
		}
		counter++;

		for (var i = pipes.length - 1; i >= 0; i--) {

			pipes[i].update();

			if (pipes[i].hits(bird)) {
				// el pajaro que choca se elimina
				console.log(" chocaste ,estas muerto ");
			}

			if (pipes[i].offscreen()) {
				pipes.splice(i, 1);
			}
			// si toca el piso muere
			if (bird.offscreen()) {
				// el pajaro que choca se elimina
				console.log(" al piso , estas muerto");
			}

		}


		bird.think(pipes);
		bird.update();


	}
	// drawing
	background(0);
	bird.show();
for ( let pipe of pipes){
	pipe.show();
}


}