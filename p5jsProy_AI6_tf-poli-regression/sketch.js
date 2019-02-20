let x_vals = [];
let y_vals = [];
tf.disableDeprecationWarnings();

let a, b, c; // cuadratica
// arma el optimizer
const learningRate = 0.5;
const optimizer = tf.train.adam(learningRate);

function setup() {
	createCanvas(400, 400);
	background(0);

	a = tf.variable(tf.scalar(random(-1, 1))); // inicializa a
	b = tf.variable(tf.scalar(random(-1, 1))); // inicializa b
	c = tf.variable(tf.scalar(random(-1, 1))); // inicializa c
	d = tf.variable(tf.scalar(random(-1, 1))); // inicializa c
}

function loss(pred, labels) {
	return pred.sub(labels).square().mean(); // (pred-label)^2
}

function predict(x) {
	const xs = tf.tensor1d(x);
	// y=ax^3+bx^2+cx+d
	const ys = xs.pow(3).mul(a).add(xs.square().mul(b).add(xs.mul(c).add(d)));
	return ys;
}

function mousePressed() {
	let x = map(mouseX, 0, width, -1, 1);
	let y = map(mouseY, 0, height, 1, -1);

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
		let px = map(x_vals[i], -1, 1, 0, width);
		let py = map(y_vals[i], -1, 1, height, 0);

		point(px, py);
	}

	// muestra la linea ajustada
	tf.tidy(() => {
		const curveX = [];
		for (let x = -1; x < 1.1; x += .05) {
			curveX.push(x);

		}
		const ys = predict(curveX);
		let curveY = ys.arraySync(); // paso el tensor a un array

		beginShape();
		noFill();
		stroke(255);
		strokeWeight(4);
		for (let i = 0; i < curveX.length; i++) {
			let y = map(curveY[i], -1, 1, height, 0);
			let x = map(curveX[i], -1, 1, 0, width);
			vertex(x, y);

		}
		endShape();


	});
	//	ys.dispose(); // limpiando memoria
	stroke(100);
	strokeWeight(1);
	line(0, height / 2, width, height / 2);
	line(width / 2, 0, width / 2, height);

	textStyle(NORMAL);
	strokeWeight(1);
	// pasar los tensores a numeros
	let a1=a.dataSync();
	let a2 = b.dataSync();
	let a3 = c.dataSync();
	let a4 = d.dataSync();
	text("a " + nf(a1, 1, 2) + " b " + nf(a2, 1, 2) + " c " + nf(a3, 1, 2) + " d " + nf(a4, 1, 2), 150, 50);
	text("tensors " + tf.memory().numTensors, 200, height - 50);
}