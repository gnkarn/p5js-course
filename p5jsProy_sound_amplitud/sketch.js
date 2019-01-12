//let mic;
// como tomar la amplitud ya sea del mic o de un file
// y graficarlo

let song;
let button;
let amp;
let vol;
let hist = [];
let init = 0;

function preload() {
//	song = loadSound("12 Bedshaped.mp3");
}

function setup() {
	//song.play();
	//mic=new p5.AudioIn();
	//mic.start();

	createCanvas(200, 200);
	angleMode(DEGREES);

	noFill();
	amp = new p5.Amplitude();
	button = createButton('toggle');
	button.mousePressed(toggle);


}

function toggle() {
	if (song.isPlaying()) {
		song.stop()
	} else {
		song.play();
	}
}

function draw() {
	background(0);
	stroke(255);

	//var vol= mic.getLevel();
	vol = amp.getLevel();
	hist.push(vol);
	translate(width / 2, height / 2);// centrado
	beginShape();
	for (let i = 0; i < 360; i++) {
		let x = hist[i] * cos(i);
		let y = hist[i] * sin(i);
		vertex(100 * x, 100 * y);

	}
	endShape();
	if (hist.length > 360) {
		hist.splice(0, 1);
	}
	//ellipse(100, 150, vol * 100, vol * 100);
}