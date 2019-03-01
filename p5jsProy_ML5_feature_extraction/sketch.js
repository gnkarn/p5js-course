// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Transfer Learning Feature Extractor Classification with ml5
// https://youtu.be/eeO-rWYFuG0
// presionar varias veces happy , con una imagen a asociar
// presionar varias veces sad , con una imagen que lo represente
// mantener presionado train , hasta finalizar 
// luego mostrar las imagenes y ver el label
// incluye una forma de guardar el modelo en download.

let mobilenet;
let classifier;
let video;
let label = 'test';
let ukeButton;
let whistleButton;
let trainButton;
let saveButton;
let loaded = false;

function modelReady() {
	console.log('Model is ready!!!');
	// carga el modelo guardado luego del training
	// ojo el path dependera de cual es la raiz del server
	classifier.load('/p5jsProy_ML5_feature_extraction/model.json', customModelReady); // carga el modelo guardado
	
}
// si guarde un file de training , entonces esta funcion tiene sentido
// y usara el modelo guardado para clasificar 
function customModelReady(){
		console.log('Custom Model is ready!!!');
	loaded = true;
	classifier.classify(gotResults)
}

function videoReady() {
	console.log('Video is ready!!!');
}

function whileTraining(loss) {
	if (loss == null ) {
		console.log('Training Complete');
		classifier.classify(gotResults);
	} else {
		console.log(loss);
	}
}


function gotResults(error, result) {
	if (error) {
		console.error(error);
	} else {
		label = result;
		classifier.classify(gotResults);
	}
}

function setup() {
	createCanvas(320, 270);
	video = createCapture(VIDEO, videoReady);
	video.hide();
	background(0);
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	classifier = mobilenet.classification(video, videoReady);

	ukeButton = createButton('happy');
	ukeButton.mousePressed(function () {
		classifier.addImage('happy');
	});

	whistleButton = createButton('sad');
	whistleButton.mousePressed(function () {
		classifier.addImage('sad');
	});

	trainButton = createButton('train');
	trainButton.mousePressed(function () {
		classifier.train(whileTraining);
	});
	saveButton = createButton('save');
	saveButton.mousePressed(function () {
		classifier.save();
	});

}

function draw() {
	background(0);
	image(video, 0, 0, 320, 240);
	fill(255);
	textSize(16);
	text(label, 10, height - 10);
}