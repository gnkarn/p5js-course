//let mic;
// como tomar la amplitud ya sea del mic o de un file
// y graficarlo

let song;
let button;
let amp;
let vol;
let hist = [];


function preload() {
	song = loadSound("12 Bedshaped.mp3");
}

function setup() {
	createCanvas(200, 200);

	noFill();
	amp = new p5.Amplitude();
	button = createButton('toggle');
	button.mousePressed(toggle);

	//song.play();
	//mic=new p5.AudioIn();
	//mic.start();

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

	beginShape();
	for (let i = 0; i < hist.length; i++) {
		//console.log(vol);
		let y = map(hist[i], 0, 1, height / 2, 0);
		vertex(i, y);

	}
	endShape();
	if (hist.length > width - 20) {
		hist.splice(0, 1);
	}
	stroke(255, 0, 0);
	line(hist.length, height, hist.length, 0)
	ellipse(100, 150, vol * 100, vol * 100);
}