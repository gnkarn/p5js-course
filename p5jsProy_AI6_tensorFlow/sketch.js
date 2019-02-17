// para actualizar p5 desde cdn 
// https://cdnjs.com/libraries/p5.js

function setup() {
	createCanvas(windowWidth, windowHeight);
	// Pass an array of values to create a vector.

	//	tens.print();
	//console.log(tens.toString());

	// hay que ponerlo de esta forma pues tens se ejecuta async, 
	// y como la operacion demora hay que aguardar que la promesa se complete
	// para esto uso then.
	// tens.data().then( function (stuff){
	// 	console.log(stuff);
	// });
	// operations 

	// tens.print(tens);

	// // otra forma es esperar a que termine de cargarse
	// console.log(tens.dataSync());
	// let arr1 = tens.arraySync();
	// console.log(arr1[0][1]); // accede al vector fila 1 , de la primera matriz

	// //crea una variable, los tf a secas NO pueden cambiarse
	// const vtens = tf.variable(tens);

	// const a = tf.tensor1d([1, 2, 3, 4]);
	// const b = tf.tensor1d([10, 20, 30, 40]);

	// a.add(b).print(); // or tf.add(a, b)

	// const aa = tf.tensor2d([1, 2], [1, 2]);
	// const bb = tf.tensor2d([1, 2, 3, 4], [2, 2]);
	// aa.print();
	// bb.print();
	// aa.matMul(bb).print(); // or tf.matMul(a, b)


	// operations end
}

function draw() {
	// memory management
	// const values = [];
	// for (let i = 0; i < 150000; i++) {
	// 	values[i] = random(0, 255);
	// }
	// const shape = [1,500,300];

	// const tens = tf.tensor3d(values, shape, 'int32');
	// const tens2 = tf.tensor3d(values, shape, 'int32');
	// const vtens = tf.variable(tens);
	// tens3 = tf.matMul(tens,tens2,0,1);
	// tens.dispose();
	// tens2.dispose();
	// tens3.dispose();
	// vtens.dispose();

	// tf.tidy(myStuff);
	// function myStuff(){
	// 	const values = [];
	// 	for (let i = 0; i < 150000; i++) {
	// 		values[i] = random(0, 255);
	// 	}
	// 	const shape = [1, 500, 300];

	// 	const tens = tf.tensor3d(values, shape, 'int32');
	// 	const tens2 = tf.tensor3d(values, shape, 'int32');
	// 	const vtens = tf.variable(tens);
	// 	tens3 = tf.matMul(tens, tens2, 0, 1);
	// 	tens.dispose();
	// 	tens2.dispose();
	// 	tens3.dispose();
	// 	vtens.dispose();

	// }

	// otra forma de escribir lo anterior

	tf.tidy(() => {
		const values = [];
		for (let i = 0; i < 150000; i++) {
			values[i] = random(0, 255);
		}
		const shape = [1, 500, 300];

		const tens = tf.tensor3d(values, shape, 'int32');
		const tens2 = tf.tensor3d(values, shape, 'int32');
		const vtens = tf.variable(tens);
		tens3 = tf.matMul(tens, tens2, 0, 1);
		tens.dispose();
		tens2.dispose();
		tens3.dispose();
		vtens.dispose();
	});


	console.log(tf.memory().numTensors);

}