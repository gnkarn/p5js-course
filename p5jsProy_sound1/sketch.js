let song;
let sliderVol;

// con preload
// function preload() {
// 	song = loadSound("12 Bedshaped.mp3");
// }

// function setup() {
// 	createCanvas(200, 200);
// 	background(55);
// 	song.play();
// sliderVol = createSlider(0, 1, .1, .1);

// }

// function draw() {
// 	song.setVolume(sliderVol.value());
// }

// con callback

let sliderRate;
let sliderPan;
let jumpButton;
let loaded_flag;
let l;
function setup() {


	song = loadSound("12 Bedshaped.mp3", loaded);
	amplitude = new p5.Amplitude();
	createCanvas(200, 200);

	sliderVol = createSlider(0, 1, .1, .1);
	sliderRate = createSlider(.5, 2, 1, .1);
	sliderPan = createSlider(-1, 1, 0, .1);
	button = createButton("play");
	button.mousePressed(togglePlaying);
	jumpButton = createButton("jump");
	jumpButton.mousePressed(jumpsong);
	createP("song");
	l=createElement('song_l', 'tiempo');
}

function jumpsong() {
	var len = song.duration();
	let t = song.currentTime() + (len - song.currentTime()) / 2;
	song.jump(t);
}

function togglePlaying() {
	if (song.isPlaying()) {
		song.pause();
		button.html("play");
	} else {
		if (loaded_flag) {
			song.play();
		}
		button.html("pause")
	}
}

function loaded() {
	loaded_flag = 1;
}

function draw() {
	fill(random(255));
	background(44, 44);
	var level = amplitude.getLevel();
	var size = map(level, 0, 1, 0, 200);
	ellipse(width / 2, height / 2, size, size);
	song.setVolume(sliderVol.value());
	song.pan(sliderPan.value());
	song.rate(sliderRate.value());

	songL = map(song.currentTime(), 0, song.duration(), 0, width);
	rect(0, height - 15, songL, 10);

}