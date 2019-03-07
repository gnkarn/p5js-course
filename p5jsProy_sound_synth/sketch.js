let wave;
let button;
let playing = false;
let slider;
let f;
let p;
function setup() {
	createCanvas(100, 100);
	wave = new p5.Oscillator();
	wave.setType('sine');
	wave.amp(1);
	wave.freq(300);
	wave.start();
	button = createButton('play/pause');
	button.mousePressed(toggle);
	slider= createSlider(25, 15000,300, 1);
	p = createP("freq :");
	f= createElement('p1', wave.freq().value);
}

function toggle() {
	if(playing){ wave.amp(0,1);
		playing=false;
	}else{wave.amp(.3,1);
	playing=true;
}
}

function draw() {
wave.freq(slider.value());
f.parent(p);
f.html(wave.freq().value);
} 