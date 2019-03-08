//https: //youtu.be/FGC5TdIiT9U
// en una dimension , al aumentar counter si podemos hacer el salto desde 
//el estado actual a (actual-counter)>0, entonces va hacia atras 
// caso contrario va hacia adelante

let numbers = [false];

var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001;
var decayTime = 0.5;
var susPercent = 0.3;
var releaseTime = 1;

let count = 1;
sequence = [];
let index = 0;
let arcs = [];

class Arc {
	constructor(start, end, dir, hue) {
		this.start = start;
		this.end = end;
		this.dir = dir;
		this.hue = hue;
	}

	show() {
		let d = abs(this.end - this.start);
		let xcenter = (this.end + this.start) / 2;
		noFill();

		strokeWeight(.5);
		stroke(color(this.hue, 255, 255, 150));
		if (this.dir == 0) {
			arc(xcenter, 0, d, d, PI, TWO_PI);
		} else {
			arc(xcenter, 0, d, d, 0, PI);
		}
	}
}

function setup() {
	pixelDensity(2);
	createCanvas(windowWidth, windowHeight);
	background(0);
	numbers[index] = true;
	sequence.push(index);
	colorMode(HSB, 255, 255, 255, 255);


	env = new p5.Env(); //envelope
	env.setADSR(attackTime, decayTime, susPercent, releaseTime);
	env.setRange(attackLevel, releaseLevel);

	osc = new p5.Oscillator();
	osc.setType('sine');
	osc.amp(env);
	osc.start();
	env.play();
	frameRate(10);
}

function step() {
	let next = index - count;
	if (next <= 0 || numbers[next]) {
		next = index + count;
	}
	numbers[next] = true;
	sequence.push(next);
	let a = new Arc(index, next, count % 2, count % 255);
	arcs.push(a);
	let n = index % 25 ;
	let freq = pow(2, (n ) / 12) * 440; // in hz
	osc.freq(freq);
	env.play();
	index = next;
	count++;

}

function draw() {
	background(0);
	translate(0, height / 2);
	scale(width / count);
	step();
	for (let a of arcs) {
		a.show();
	}

}