// https: //github.com/CodingTrain/website/blob/master/Courses/natureofcode/10.18-toy_neural_network/lib/matrix.js
var nn;
let training_data = [{
		inputs: [0, 0],
		targets: [0]
	},
	{
		inputs: [0, 1],
		targets: [1]
	},
	{
		inputs: [1, 0],
		targets: [1]
	},
	{
		inputs: [1, 1],
		targets: [0]
	}
];

function setup() {
	createCanvas(windowWidth, windowHeight);
	nn = new NeuralNetwork(2, 2, 1);
	for (let i = 0; i < 50000; i++) {
		let data = random(training_data);
		nn.train(data.inputs, data.targets);
	}


	console.log(nn.feedforward([0, 0]));
	console.log(nn.feedforward([0, 1]));
	console.log(nn.feedforward([1, 0]));
	console.log(nn.feedforward([1, 1]));
	//console.log(output);

	// let a = new Matrix(2, 3);
	// let b = new Matrix(3, 2);
	// a.randomize(10);
	// b.randomize(10);
	// a.print();
	// b.print();

	// let c = Matrix.multiply(a,b);
	// c = c.transpose();
	// c.print();

	// function double(a){
	// 	return a*2;
	// }

	// c.map(double);
	// c.print();

}


function draw() {

}