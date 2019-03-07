// tecnica para que el inicio y el final de una animacion aleatoria coincidan
//cc 136.2 PErlin gifs

let noiseMax = .5;
let phase = .4;
let a = 0; // angle
let xNoise, yNoise;
let particles = [];

function setup() {
	createCanvas(300, 300);
	for (let p =0;p<100;p++) {
		particles[p] = new Particle();
	}

	slider = createSlider(0, 10, 1, .01);
	slider_phase = createSlider(0, 4, 0, .01);
	slider_rot_speed = createSlider(0, 1, 0, .01);
	//frameRate(20);
}

function draw() {
	//noiseSeed(99); // para que repita el noise space en cada corrida
	noiseMax = slider.value();
	background(0);
	let xoff = 0; // 2d perlin noise offsets
	let yoff = 0;
	for (let p = 0; p < particles.length; p++) {
		particles[p].render(a+phase);
	}
	//phase=phase+slider_phase.value();
	// xoff = map(cos(a + phase + slider_phase.value()), -1, 1, 0, noiseMax);
	// yoff = map(sin(a + phase + slider_phase.value()), -1, 1, 0, noiseMax);
	// let r = noise(xoff, yoff);

	// let x = map(xoff, 0, 1, 0, width);
	// let y = map(yoff, 0, 1, 0, height);
	// fill(r * 255);

	a += radians(.4);

	phase += slider_rot_speed.value();
}