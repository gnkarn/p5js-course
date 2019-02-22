let model;
tf.disableDeprecationWarnings();

const train_xs = tf.tensor2d([
	[0, 0],
	[1, 0],
	[0, 1],
	[1, 1]
]);
const train_ys = tf.tensor2d([
	[0],
	[1],
	[1],
	[0]
]);



let xs;
let cols, rows;
let resolution;

function setup() {
	createCanvas(400, 400);
	resolution = 20;
	cols = width / resolution;
	rows = height / resolution;

	// create input data
	let inputs = [];
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x1 = i / cols; //  para inputs de 0-1
			let x2 = j / rows;
			inputs.push(
				[x1, x2]);
		}
	}

	xs = tf.tensor2d(inputs);

	model = tf.sequential();
	let hidden = tf.layers.dense({
		inputShape: [2],
		units: 4,
		activation: 'sigmoid'
	})
	let output = tf.layers.dense({
		units: 1,
		activation: 'sigmoid'
	})
	model.add(hidden);
	model.add(output);

	// optimizer with stoch grad desc
	const sgdOpt = tf.train.adam(.2);

	model.compile({
		optimizer: sgdOpt,
		loss: 'meanSquaredError'
	})

	setTimeout(train, 10);


}

function trainModel() {
	return model.fit(train_xs, train_ys, {
		shuffle: true,
		epochs: 100
	});

	//console.log(response.history.loss[0]);
}

function train() {
	trainModel().then(results => {
		//console.log(results.history.loss[0]);
		setTimeout(train, 10);
	});
}


function draw() {

	background(0);
	// translate(-width / 2, height / 2, 0); //moves our drawing origin to the top left corner
	// rotateX(radians(-120));

	tf.tidy(() => {

		let ys = model.predict(xs);
		let y_values = ys.dataSync();

		let index = 0;

		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				let br = y_values[index] * 255;
				fill(br);
				rect(i * resolution, j * resolution, resolution, resolution);
				fill(255 - br);
				textAlign(CENTER, CENTER);
				textSize(8);
				text(nf(y_values[index], 1, 2), i * resolution + resolution / 2, j * resolution + resolution / 2);

				index++;
			}
		}
	});
}