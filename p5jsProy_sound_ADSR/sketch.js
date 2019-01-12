let env;
let wave;
let button;
let playing = false;
let slider;
let f;
let p;

function setup() {
	createCanvas(100, 100);

	env = new p5.Env();
	env.setADSR(0.05, 0.1, 0.4, .6);
	env.setRange(2, 0.0); // setea amplitud de A,R

	wave = new p5.Oscillator();
	wave.setType('sine');
	wave.freq(300);
	wave.start();


	wave.amp(env); // conecta wave con envelope

	button = createButton('play');
	button.mousePressed(toggle);
	slider = createSlider(25, 15000, 300, 1);
	p = createP("freq :");
	f = createElement('p1', wave.freq().value);


}

function toggle() {
	env.play();
}

function draw() {
	wave.freq(slider.value());
	f.parent(p);
	f.html(wave.freq().value);
}