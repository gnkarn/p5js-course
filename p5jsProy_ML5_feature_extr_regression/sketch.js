// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Transfer Learning Feature Extractor Classification with ml5
// https://youtu.be/eeO-rWYFuG0
// presionar varias veces happy , con una imagen a asociar
// presionar varias veces sad , con una imagen que lo represente
// mantener presionado train , hasta finalizar 
// luego mostrar las imagenes y ver el label


let mobilenet;
let predictor;
let video;
let value = 0;
let slider;
let addButton;

function modelReady() {
	console.log('Model is ready!!!');
}

function videoReady() {
	console.log('Video is ready!!!');
}

function whileTraining(loss) {
	if (loss == null) {
		console.log('Training Complete');
		predictor.predict(gotResults);
	} else {
		console.log(loss);
	}
}


function gotResults(error, result) {
	if (error) {
		console.error(error);
	} else {
		value = result;
		predictor.predict(gotResults);
	}
}

function setup() {
	createCanvas(320, 240);
	slider = createSlider(0, 1, .5, .01);

	video = createCapture(VIDEO, videoReady);
	video.hide();
	background(0);
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	predictor = mobilenet.regression(video, videoReady);

	addButton = createButton('add example image');
	addButton.mousePressed(function(){
		predictor.addImage(slider.value());
	});

trainButton = createButton('train');
trainButton.mousePressed(function () {
	predictor.train(whileTraining);
});
	
}

function draw() {
	background(0);
	image(video, 0, 0, 320, 240);
	rectMode(CENTER);
	fill(255);
	rect(0, 50, value*width, 30);
	
	fill(255);
	textSize(16);
	text(value, 10, height - 10);
}