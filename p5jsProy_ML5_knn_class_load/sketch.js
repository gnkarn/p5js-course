// https://observablehq.com/@nsthorat/how-to-build-a-teachable-machine-with-tensorflow-js
// para entrenar el modelo , seleccionar con el mouse el canvas
// usar las teclas L,y R, para clasificar dos imagenes ( left y right) , unas 15 veces cada una
// una vez con datos , comenzara a mostrar la clasificacion
// incluye grafico de los logits , tomados del array de 1000
// Funciona perfecto //
// incluye una forma de salvar el file y cargarlo
// se baja en download y se debe copiar al folder de _class_load
// pueden agregarse mas muestras de entrenamiento con las teclas l,r,n
// pero se pierden con reload , y solo quedara las incoporadas con el file

let video;
let features;
let knn;
let labelP;
let ready = false;
let data;
let label ="";
let x=300;

function setup() {
	createCanvas(320, 240);
	video = createCapture(VIDEO);
	video.size(320, 240);
	//video.style("transform","scale(-1,1)");// invierte para hacer espejo
	video.hide();
	features = ml5.featureExtractor("MobileNet", modelReady);
	labelP = createP("need training data wait ...");
	labelP.style('font-size', '16pt');
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
	console.log(" mobilenet loaded");
	labelP.html(" mobilenet loaded");
	knn = ml5.KNNClassifier();
	knn.load('/p5jsProy_ML5_knn_class_load/knn_model.json', function () {
		console.log("knn data loaded");
		data = goClassify();
	
	});
}

function goClassify() {
	const logits = features.infer(video);
	knn.classify(logits, function (error, result) {
		if (error) {
			console.log(error);
		} else {
			label=result.label;
			console.log(result);
			ready = false;
			labelP.html(result.label);
			goClassify(); // ahora no necesita de draw
			data = logits;
			
		}
	});
	//return logits;
}

function charting(data) {
	background(0,44);
	for (let i = 0; i < data.length; i++) {
		stroke(255, 44);
		let step = width / data.length;
		line(step * i, height - 50, step * i, (height - 50 - 2 * data[i]));
	}
}

function draw() {
	image(video, 0, 0);
	if (label=="right"){
		x+=2;
	}else if(label=="left"){
		x-=2;
	}else if(label=="nada"){
		background(0,22);
	}
	x=constrain(x,0,width);

	ellipse(x, height / 2, 36);
	
	if (data){
			charting(data.dataSync());
	}


}