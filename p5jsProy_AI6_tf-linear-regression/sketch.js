let x_vals = [];
let y_vals = [];
tf.disableDeprecationWarnings();

let m, b;
// arma el optimizer
const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

function setup() {
	createCanvas(400, 400);
	background(0);

	m = tf.variable(tf.scalar(random(1))); // inicializa m
	b = tf.variable(tf.scalar(random(1))); // inicializa b

}

function loss(pred, labels) {
	return pred.sub(labels).square().mean(); // (pred-label)^2
}

function predict(x) {
	const xs = tf.tensor1d(x);
	// y=mx+b
	const ys = xs.mul(m).add(b);

	return ys;
}

function mousePressed() {
	let x = map(mouseX, 0, width, 0, 1);
	let y = map(mouseY, 0, height, 1, 0);

	x_vals.push(x);
	y_vals.push(y);

}

function draw() {
	background(44);
	tf.tidy(() => {
		if (x_vals.length > 0) {
			const ys = tf.tensor1d(y_vals);
			optimizer.minimize(() => loss(predict(x_vals), ys));
		}
	})

	stroke(255);
	strokeWeight(4)
	for (let i = 0; i < x_vals.length; i++) {
		point(x_vals[i] * width, height - y_vals[i] * height);
	}

	// muestra la linea ajustada
	tf.tidy(() => {
		const xs = [0, 1];
		const ys = predict(xs);
		let yp = ys.arraySync(); // paso el tensor a un array
		let yp1 = height - yp[0] * height;
		let yp2 = height - yp[1] * height;
		line(0, yp1, width, yp2);
	});
	//	ys.dispose(); // limpiando memoria
text("tensors " + tf.memory().numTensors, 200, height-50);
}