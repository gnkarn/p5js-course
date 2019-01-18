// lexicographic permutations
// https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
// buac TODAS LAS  permutaciones en orden , comenzando desde el numero dado y buscando el siguiente
let vals = [0,1,2,3,4,5,6];
let endArray = [];


function setup() {
	createCanvas(400, 300);
	background(51);
	console.log(vals);

}
function swap(arr, a, b) {
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
	return arr;
}
function draw() {

	background(44);
	// STEP 1
	let largest_i = -1;
	for (let i = 0; i < vals.length - 1; i++) {
		if (vals[i] < vals[i + 1]) {
			largest_i = i;

		}

	}
	console.log("larg i " + largest_i);
	if (largest_i == -1) {
		noLoop();
		console.log(" finished ");
	}
	//step 2
	let largest_y = -1;
	for (let y = 0; y < vals.length; y++) {
		if (vals[largest_i] < vals[y] ) {
			largest_y = y;

		}
	}
	//console.log("larg y " + largest_y);
	console.log(vals);
	// step 3 swap
	swap(vals, largest_y, largest_i);
	console.log(vals);
	// step 4 reverse
	endArray = vals.splice(largest_i +1 );

	endArray.reverse();
	console.log(endArray);
	vals = vals.concat(endArray);
	textSize(64);
	let s="";
	for (let i =0;i< vals.length;i++){
		s+=vals[i];
	}
fill(255);
text(s,20,height/2);

}

