// https://github.com/CodingTrain/Toy-Neural-Network-JS/tree/master/examples/doodle_classification
// Toy - Neural - Network - JS: https: //github.com/CodingTrain/Toy-Ne...
// 	Deeplearn.js: https: //deeplearnjs.org/
// 	ITP 's ML5.js library: https://github.com/ITPNYU/ml5-js
// Rajiv Shah 's Blog Post: http://projects.rajivshah.com/blog/20...
// MNIST Database: http: //yann.lecun.com/exdb/mnist/
// 	Google Quick Draw: https: //quickdraw.withgoogle.com/
// 	Mimi Onuoha 's Missing Datasets: https://github.com/MimiOnuoha/missing...
let data;
let img;
let cats_data;
let rainbows_data;
let trains_data;

const len = 784; //28x28
const total_data = 1000;

// categorias
const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let cats_training;
let rainbows_training;
let trains_training;

let cats = {};
let rainbows = {};
let trains = {};

let nn;

function preload() {
	cats_data = loadBytes('data/cats1000.bin');
	trains_data = loadBytes('data/trains1000.bin');
	rainbows_data = loadBytes('data/rainbows1000.bin');
}

function prepareData(category, data, label) {
	category.training = [];
	category.testing = [];
	for (let i = 0; i < total_data; i++) {
		let offset = i * len;
		let sample = floor(0.8 * total_data);

		if (i < sample) {
			category.training[i] = data.bytes.subarray(offset, offset + len);
			category.training[i].label = label;
		} else {
			category.testing[i - sample] = data.bytes.subarray(offset, offset + len);
			category.testing[i - sample].label = label;
		}
	}
}

function trainEpoch(training_) {
	for (let i = 0; i < training_.length; i++) {
		//let inputs = [];
		let data = training_[i];
		let inputs = Array.from(data).map(x => x / 255);
		let label = training_[i].label;
		//	console.log(inputs);
		let targets = [0, 0, 0];
		targets[label] = 1; // tiene 3 salidas , la que coincide con el label le pongo un 1 las demas 0
		//console.log(targets);

		nn.train(inputs, targets);

	}

}
// efectua la clasificacion y la compara con el label real 
function testAll(testing_) {
	let correct = 0;
	for (let i = 0; i < testing_.length; i++) {
		//let inputs = [];
		let data = testing_[i];
		let inputs = Array.from(data).map(x => x / 255);
		let label = testing_[i].label;
		//	console.log(inputs);
		let guess = nn.feedforward(inputs);
		// console.log(guess);
		// console.log(label);
		// el mayor sera la clasificacion realizada por nn, y busco el indice del mayor
		let m = max(guess);
		let classification = guess.indexOf(m);
		//console.log(classification);
		if (classification === label) {

			correct += 1;
		}
	}
	return 100 * correct / testing_.length;

}

function setup() {
	console.log("setup");
	createCanvas(280, 280);
	// saco 800 para training y 200 para testing de cada uno
	prepareData(cats, cats_data, CAT);
	prepareData(rainbows, rainbows_data, RAINBOW);
	prepareData(trains, trains_data, TRAIN);

	// making the neural net
	nn = new NeuralNetwork(784, 64, 3);

	// junto un solo array y luego lo barajamos
	let training = [];
	training = training.concat(cats.training);
	training = training.concat(rainbows.training);
	training = training.concat(trains.training);

	shuffle(training, 1);
	//console.log(training);

	// preparando testing 
	let testing = [];
	testing = testing.concat(cats.testing);
	testing = testing.concat(rainbows.testing);
	testing = testing.concat(trains.testing);

	// training
	let trainButton = select('#train');
	let epochCountr = 0;
	trainButton.mousePressed(function () {
		trainEpoch(training);
		epochCountr++;
		console.log(' fin training para un EPOCH ' + epochCountr);
	});

	let testButton = select('#test');
	// test
	// for  epoch #
	testButton.mousePressed(function () {
		let percent = testAll(testing);
		console.log("testing result " + nf(percent, 2, 2) + "%");
	});

	let guessButton = select('#guess');

	// lee el dibujo realizado en el canvas
	guessButton.mousePressed(function () {
		let inputs = [];
		let img = get();
		img.resize(28, 28);
		img.loadPixels();

		let len = img.pixels.length / 4;
		// toma el valor cada cuatro , pues img es RGBa, y solo necesito un valor
		for (let i = 0; i < len; i++) {
			let bright = img.pixels[i * 4];
			inputs[i] = bright / 255.0;
		}
		console.log(inputs);
		let guess = nn.feedforward(inputs);
		let m = max(guess);
		let classification = guess.indexOf(m);
		console.log("class = " + classification);
		if (classification === CAT) {
			console.log("cat")
		} else if (classification === RAINBOW) {
			console.log("RAINBOW")
		} else if (classification === "train") {
			console.log("train")
		} else {
			console.log(" nada igual")
		}
		//image(img,0,0);
	});

	let clearButton = select('#clear');
	clearButton.mousePressed(function () {
		background(0);

	})
	// let total = 100;

	// for (let n = 0; n < total * len; n++) {
	// 	let img = createImage(28, 28);
	// 	img.loadPixels();
	// 	let offset = n * len;
	// 	for (let i = 0; i < len; i++) {
	// 		let val = cats_data.bytes[i + offset];
	// 		img.pixels[i * 4] = val;
	// 		img.pixels[i * 4 + 1] = val;
	// 		img.pixels[i * 4 + 2] = val;
	// 		img.pixels[i * 4 + 3] = 255;
	// 	}
	// 	img.updatePixels();
	// 	let x = (n % 10) * 28;
	// 	let y = floor(n / 10) * 28;
	// 	image(img, x, y);

	// }
	background(0);
}


function draw() {
	strokeWeight(10);
	stroke(255);
	if (mouseIsPressed) {
		line(pmouseX, pmouseY, mouseX, mouseY);
	}

}







// la funcion no es reconocid por p5 asi que la cargue desde github by daniel s.
p5.prototype.registerPreloadMethod('loadBytes');
p5.prototype.loadBytes = function (path, callback, errorCallback) {
	var self = this;
	var ret = {};
	var oReq = new XMLHttpRequest();
	oReq.open('GET', path, true);
	oReq.responseType = 'arraybuffer';
	oReq.onload = function (oEvent) {
		if (oReq.status >= 400) {
			return;
		}
		var arrayBuffer = oReq.response;
		if (arrayBuffer) {
			ret.bytes = new Uint8Array(arrayBuffer);
			if (callback) {
				callback(ret);
			}
			self._decrementPreload();
		}
	};
	if (errorCallback) {
		oReq.onerror = errorCallback;
	}
	oReq.send(null);
	return ret;
};