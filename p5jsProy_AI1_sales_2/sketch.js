// calcula el camino mas corto entre las ciudades
// va probando todas las combinaciones posibles
//sin repetirlas , pero sin aplicar ningun algoritmo de optimizacion
// por lo tanto el numero de compinaciones posibles crece como factorial
// del numero de ciudades
// calcula el numero de permutaciones remanentes , el tiempo remanente , y el %
// de mejora en entre los ultimos dos caminos
let cities = [];
let totalCities = 7;
let order = [];

let bestPath = [];
let recordDistance = 9999999999999;
let newDist = 0;
let dato;
let totalPermutations;
let actualPerm = 0;
let initialTime = 0;

function setup() {
	createCanvas(400, 600);
	for (var i = 0; i < totalCities; i++) {
		let v = createVector(random(width), random(height / 2 - 50));
		cities[i] = v;
		order[i] = i;
	}
	recordDistance = calcDistance(cities, order);
	dato = createP("Distancia : ");
	bestPath = order.slice(0, order.length);
	console.log("best" + bestPath);
	totalPermutations = factorial(totalCities);
	console.log("total perm " + totalPermutations);
}

// dibuja el mejor camino encontrado al momento
function drawBestPath(best) {
	translate(0, 200);
	stroke(255, 0, 0);
	strokeWeight(4);
	color(255, 0, 0, 44);
	noFill();
	beginShape();
	for (var i = 0; i < best.length; i++) {
		let n = best[i];
		vertex(cities[n].x, cities[n].y);
		ellipse(cities[n].x, cities[n].y, 10, 10);
	}
	endShape();
	strokeWeight(1);
	stroke(255);
}


function calcDistance(points, orden) {
	let sum = 0;
	for (let i = 0; i < points.length - 1; i++) {
		sum += p5.Vector.dist(points[orden[i]], points[orden[i + 1]]);
	};
	//console.log("sum " + sum);
	return sum;
}


// lexicographic permutations
// https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
// buac TODAS LAS  permutaciones en orden , comenzando desde el numero dado y buscando el siguiente

let endArray = [];


function draw() {
	let elapsedTime = millis() / 1000 ;

	background(51, 244);
	fill(255);
	for (var i = 0; i < cities.length; i++) {
		ellipse(cities[i].x, cities[i].y, 10, 10);
	}

	noFill();
	beginShape();
	stroke(255);
	//color(255, 0, 0);
	noFill();
	for (var i = 0; i < order.length; i++) {
		let n = order[i]; // refiere al array ordenado, like lookup table
		vertex(cities[n].x, cities[n].y);
	}
	endShape();

	newDist = calcDistance(cities, order);

	if (newDist < recordDistance) {
		bestPath = order.slice(0, order.length); // copio cities array a bestPath
		let mejora = floor((newDist - recordDistance) / recordDistance * 100);
		dato.html("mejora: " + mejora + "%");

		recordDistance = newDist;
		//console.log(newDist);
		dato.html(" " + floor(newDist), append);
		//drawBestPath(bestPath);

	}
	// informacion 
	textSize(12);
	let pp = totalPermutations - actualPerm; // remaining permutations

	let remainingTime = floor(elapsedTime /actualPerm * pp );
	text(pp + " faltan : " + remainingTime + "  segs", 10, height - 10);
	stroke(255);
	fill(0, 0, 240);
	rect(width - 15, height - 100, 10, 100 * pp / totalPermutations);

	nextOrder(); // proxima combinacion

	textSize(64);
	let s = "";
	for (let i = 0; i < order.length; i++) {
		s += order[i];
	}
	fill(255);
	text(s, 20, height - 50); // muestra la permutacion actual

	drawBestPath(bestPath);
}

function swap(arr, a, b) {
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
	return arr;
}



// lexical order algorithm 
function nextOrder() {
	// STEP 1

	actualPerm++;

	let largest_i = -1;
	for (let i = 0; i < order.length - 1; i++) {
		if (order[i] < order[i + 1]) {
			largest_i = i;
		}
	}
	//console.log("larg i " + largest_i);
	if (largest_i == -1) {
		noLoop();
		console.log(" finished ");
	}
	//step 2
	let largest_y = -1;
	for (let y = 0; y < order.length; y++) {
		if (order[largest_i] < order[y]) {
			largest_y = y;
		}
	}
	//console.log("larg y " + largest_y);
	//console.log(order);
	// step 3 swap
	swap(order, largest_y, largest_i);
	//console.log(order);
	// step 4 reverse
	endArray = order.splice(largest_i + 1);
	endArray.reverse();

	order = order.concat(endArray);
	//console.log(order);
}

function factorial(n) {
	var ff = 1;
	for (let ii = 1; ii < n + 1; ii++) {
		ff = ff * ii;
	}
	return ff;
}