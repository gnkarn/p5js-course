let mobilenet;
let puffin;

function modelReady() {
	console.log('model is ready');
	mobilenet.predict(puffin, gotResults);
}

function imageReady() {
	image(puffin, 0, 0, width, height);
	
}

function gotResults(err, results) {
	if (err) {
		console.error(error);
	} else {
		console.log(results);
		let label=results[0].className;
		let prob=results[0].probability;

		fill(0);
		textSize(64);
		text(label,10,height-50);
		createP(label);
		createP(prob);
	}
}

function setup() {
	createCanvas(640, 480);
	background(0);

	puffin = createImg('images/puffin.jpg', imageReady)
	puffin.hide();
createImg
	image(puffin, 0, 0);
	mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}

function draw() {

}