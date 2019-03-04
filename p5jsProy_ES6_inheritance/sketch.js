//demuestra inheritance y polimorfismoen ES6
// polimorfismo, en el mismo array , puedo tener objetos diferentes
let particles = [];

function setup() {
	createCanvas(600, 600);

	for (let i = 0; i < 10; i++) {
		if (random(1) < .5) {
			particles[i] = new Confetti(300, 300);
		} else {
			particles[i] = new Particle(300, 300);
		}
	}
}

function draw() {
	background(0);
	for (let p of particles) {
		p.update();
		p.show();

	}
}