// https://observablehq.com/@nsthorat/how-to-build-a-teachable-machine-with-tensorflow-js
// para entrenar el modelo , seleccionar con el mouse el canvas
// usar las teclas L,y R, para clasificar dos imagenes ( left y right) , unas 15 veces cada una
// una vez con datos , comenzara a mostrar la clasificacion
// incluye grafico de los logits , tomados del array de 1000
// Funciona perfecto //

let video;
let features;
let knn;
let labelP;
let ready = false;


function setup() {
	createCanvas(320, 240);
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();
	features = ml5.featureExtractor("MobileNet", modelReady);
	knn = ml5.KNNClassifier();
	labelP = createP("need training data wait ...");
	labelP.style('font-size','16pt');
	labelP1 = createP("desde teclado : L left , R right N nada s save");
	labelP1.style('font-size', '12pt');
}

function mousePressed() {

}



function keyPressed() {
	const logits = features.infer(video);
	console.log(key);
	if (key == "L") {
		knn.addExample(logits, "left");

	} else if (key == "R") {
		knn.addExample(logits, "right");

	} else if (key == "N") {
		knn.addExample(logits, "nada");

	} else if (key == "S") {
		knn.save("knn_model.json");

	}
	console.log(logits.dataSync());
	//logits.print();
}

function modelReady() {
	console.log(" model is ready");
	labelP.html(" ready for training");
}

function goClassify() {
	const logits = features.infer(video);
	knn.classify(logits, function (error, result) {
		if (error) {
			console.log(error);
		} else {
			console.log(result);
			ready = false;
			labelP.html(result.label);
		}
	});
	return logits;
}
function charting(data){
	background(0,55);
	for ( let i=0 ;i<data.length;i++){
		stroke(255,44);
		let step=width/data.length;
		line(step * i, height-50, step * i, (height-50-2*data[i]));
	}
}
function draw() {
	image(video, 0, 0);
	if (knn.getNumLabels() > 0 && !ready) {
		let data=goClassify();
		ready = false;
		charting(data.dataSync());
	}

}