// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

const TOTAL = 400; // population
let birds = [];
let savedBirds = [];
let counter = 0;
let pipes = [];
let cycles=100;
let slider;

function setup() {
	createCanvas(640, 480);
	slider= createSlider(1, 100, 1);

	for (let i = 0; i < TOTAL; i++) {
		birds[i] = new Bird();
	}

}

function draw() {
	for (let n = 0; n < slider.value(); n++) {


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