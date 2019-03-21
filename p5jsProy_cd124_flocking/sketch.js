const flock = [];
let alignSlider,cohesionSlider,separationSlider;

function setup() {
	createCanvas(640, 360);
	alignSlider = createSlider(.001, 10, 1, .1);
	cohesionSlider = createSlider(.001, 10, 0.5, .1);
	separationSlider = createSlider(.001, 10, 1, .1);

	for (let i=0;i<100;i++){
	flock.push(new Boid());
	}
	
}

function draw() {
	background(51);
	for (let boid of flock) {
		boid.edges();
		boid.update();
		boid.show();
		boid.flock(flock);

	}
}