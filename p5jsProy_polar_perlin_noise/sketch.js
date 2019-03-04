// tecnica para que el inicio y el final de una animacion aleatoria coincidan
//cc 136.1

let noiseMax=.5;
let phase=.4;

function setup() {
	createCanvas(600, 600);
	slider=createSlider(0, 10, 1, .01);
	slider_phase=createSlider(0,4,0,.01);
	slider_rot_speed = createSlider(0, 1, 0, .01);
	frameRate(50);
}

function draw() {
	noiseSeed(99);// para que repita el noise space en cada corrida
	background(0);
	noiseMax=slider.value();
	translate(width / 2, height / 2);
	stroke(255);

	let xoff = 0; // 2d perlin noise offsets
	let yoff = 0;
	beginShape();
	for (let a = 0; a < TWO_PI; a += .1) {
		//phase=phase+slider_phase.value();
		xoff = map(cos(a + phase + slider_phase.value()), -1, 1, 0, noiseMax);
		yoff = map(sin(a + phase + slider_phase.value()), -1, 1, 0, noiseMax);
		let r = map(noise(xoff, yoff,frameCount/100), 0, 1, 60, 200);
		let x = r * cos(a );
		let y = r * sin(a );
	fill(r,120);

		vertex(x, y);

	}
	endShape(CLOSE);
	//noLoop();
phase+=slider_rot_speed.value();
}