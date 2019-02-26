// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&
// la version 1 funciona bien
// esta version esta basada en cc 100.4 part4, se incluye la velocidad y , como input
// y aumenta hlayer  
// muere si toca el piso
// usar indexLearn.html para esta version con entrenamiento de la red

const TOTAL = 400; // population
let birds = [];
let savedBirds = [];
let counter = 0;
let pipes = [];
let cycles = 100;
// interface elements
let speedSlider;
let speedSpan;
let highScoreSpan;
let alltimeHighscorespan;

// all time high
let highScore = 0;
// training or show the current best
let runBest = false;
let runBestbutton;

function keyPressed() {
	if (key === 'S') {
		let bird = birds[0];
		let json = JSON.stringify(bird.brain);
		//let json=bird.serialize();
		saveJSON(bird.brain, 'bird.json'); // toma el objeto y salva como json
		console.log(json);
		save
	}
}

function setup() {
	let canvas = createCanvas(640, 480);
	canvas.parent('canvascontainer');

	// access interface elements
	speedSlider=select('#speedSlider');
	speedspan=select('#speed');
	highScorespan=select('#hs');
	alltimeHighScorespan=select('#ahs');
	runBestButton=select('#best');
	for (let i = 0; i < TOTAL; i++) {
		birds[i] = new Bird();
	}

}

function draw() {
	for (let n = 0; n < speedSlider.value(); n++) {


		if (counter % 75 == 0) {
			pipes.push(new Pipe());
		}
		for (var i = pipes.length - 1; i >= 0; i--) {

			pipes[i].update();


			for (let j = birds.length - 1; j >= 0; j--) {
				if (pipes[i].hits(birds[j])) {
					// el pajaro que choca se elimina
					savedBirds.push(birds.splice(j, 1)[0]);
				}
			}
			// if (pipes[i].hits(bird)) {
			// 	console.log("HIT");
			// }

			if (pipes[i].offscreen()) {
				pipes.splice(i, 1);
			}

			// si toca el piso muere
			for (let i = birds.length - 1; i >= 0; i--) {
				if (birds[i].offscreen()) {
					// el pajaro que choca se elimina
					savedBirds.push(birds.splice(i, 1)[0]);
				}
			}
		}




		for (let bird of birds) {
			bird.think(pipes);
			bird.update();

		}
		if (birds.length === 0) {
			counter = 0;
			nextGeneration();
			pipes = [];
			pipes.push(new Pipe());
		}
		counter++;
	}
	// drawing
	background(0);
	for (let bird of birds) {
		bird.show();

	}
	for (let pipe of pipes) {
		pipe.show();
	}


}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }