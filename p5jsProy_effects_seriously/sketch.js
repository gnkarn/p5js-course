var video;
var slider;
//https://github.com/brianchirls/Seriously.js/wiki


function setup() {
	canvas = createCanvas(640, 480, WEBGL);
	canvas.id('p5canvas');
	background(51);
	video = createCapture(VIDEO);
	video.size(640, 480);
	video.id('p5video'); // para asociarle el  source
	video.hide();

	var seriously = new Seriously();
	var src = seriously.source('#p5video');
	var tgt = seriously.target('#p5canvas');

	slider = createSlider(0, 1, .5, .01);
	slider.id('blur-slider');

	var blur = seriously.effect('blur');
	blur.amount = '#blur-slider';

	blur.source = src; //applica el efecto al source
	tgt.source = blur; // envia al target
	seriously.go();
}

function draw() {


}