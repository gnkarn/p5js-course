let nn;
let training_data = [{
		inputs: [0, 0],
		outputs: [0]
	},
	{
		inputs: [0, 1],
		outputs: [1]
	},
	{
		inputs: [1, 0],
		outputs: [1]
	},
	{
		inputs: [1, 1],
		outputs: [0]
	}
];


function setup() {
	createCanvas(400, 400,WEBGL);
	

	nn = new NeuralNetwork(2, 4, 1);

}

function draw() {
	background(44);
	translate(-width / 2, height / 2, 0); //moves our drawing origin to the top left corner
	rotateX(radians(-120));
	//nn.learning_rate=.01;
	
	for (let i=0;i<1000;i++){
	let data=random(training_data); // selecciona un elemento del array
	nn.train(data.inputs,data.outputs);
	}
	let resolution =10;
	let cols = width/resolution;
	let rows = height/resolution;

	for ( let i=0;i< cols; i++){
		for ( let j=0;j<rows;j++){
			let x1 = i/cols; //  para inputs de 0-1
			let x2= j/rows;
			let inputs =[x1,x2];
			;
			let y= nn.feedforward(inputs);
			fill(255);
			//noStroke();
			stroke(255-y*255);
			//rect(i*resolution,j*resolution,resolution, resolution);
			line(i * resolution, j * resolution, 0, i * resolution, j * resolution, -y*300);
		}
	}
}