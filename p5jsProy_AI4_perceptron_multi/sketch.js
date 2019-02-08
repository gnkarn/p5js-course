var brain;


function setup() {
	createCanvas(windowWidth, windowHeight);
	brain = new NeuralNetwork(3, 3, 2);

	let a = new Matrix(2, 3);
	let b = new Matrix(3, 2);
	a.randomize(10);
	b.randomize(10);
	a.print();
	b.print();

	let c = Matrix.multiply(a,b);
	c = c.transpose();
	c.print();

	function double(a){
		return a*2;
	}

	c.map(double);
	c.print();

}

function draw() {

}