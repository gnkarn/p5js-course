const model = tf.sequential();
tf.disableDeprecationWarnings();
// las entradas son parte del hidden layer
// model
const hidden = tf.layers.dense({
	units: 4, // num of node
	inputShape: [2],
	activation: 'sigmoid'

});
// add the layer
model.add(hidden);

const output = tf.layers.dense({
	units: 1,
	// input is inferred from previous layer
	activation: 'sigmoid',
});

model.add(output);

// optimizer with stoch grad desc
const sgdOpt = tf.train.sgd(.1);

model.compile({
	optimizer: sgdOpt,
	loss: 'meanSquaredError',

});
// train (fit)
// training data xs and ys
const xs = tf.tensor2d([
	[0,0],
	[.5,.5],
	[1,1]
]);

const ys = tf.tensor2d([
	[1],
	[.5],
	[0]
]);

train().then(() => {
	console.log("training complete");
	let outputs = model.predict(xs);
	outputs.print()
});

//model.fit(xs, ys).then((response)=> console.log(response.history.loss[0]));
async function train() {
	for (let i = 0; i < 1000; i++) {
		const config={
			shuffle:true,
			epochs: 10
		}
		const response = await model.fit(xs, ys,config);
		console.log(response.history.loss[0]);
	}
}

// execute model .( predict)

// const xs = tf.tensor2d([
// 	[.25, .92],
// 	[.12, .11]
// , [.33, .22], [.55, .77]]);



function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {

}