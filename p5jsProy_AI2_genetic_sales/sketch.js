// coding challenge 35.4 , continuacion del traveler sales problem

// calcula el camino mas corto entre las ciudades
// va probando todas las combinaciones posibles
//sin repetirlas , pero sin aplicar ningun algoritmo de optimizacion
// por lo tanto el numero de compinaciones posibles crece como factorial
// del numero de ciudades
// calcula el numero de permutaciones remanentes , el tiempo remanente , y el %
// de mejora en entre los ultimos dos caminos
let cities = [];
let totalCities = 12;
let totalPopulation= 400;
let population = [];
let order = [];
let fitness = [];


let bestPath = [];
let currentBest;

let recordDistance = Infinity;
let newDist = 0;
let dato;

let actualPerm = 0;
let initialTime = 0;

function setup() {
	createCanvas(400, 600);

	for (var i = 0; i < totalCities; i++) {
		let v = createVector(random(width), random(height  - 50));
		cities[i] = v;
		order[i] = i;
	}
	// create population, variantes de recorrido
	for (var i = 0; i < totalPopulation; i++) {
		population[i] = order.slice(); // copia el array
		population[i]=shuffle(population[i]); // ordena al azar para generar un individuo aleatorio
	}



	 recordDistance = calcDistance(cities, order);
	 dato = createP("Distancia : ");
	 bestPath = order.slice(0, order.length);
	 //console.log("best" + bestPath);

}

// dibuja el mejor camino encontrado al momento
function drawBestPath(best) {
	//translate(0, 200);
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


let endArray = [];


function draw() {
	let elapsedTime = millis() / 1000;
	background(51, 244);
	fill(255);

	//GA
	calculateFitness();
	//console.log(bestPath);
	normallizeFitness();
	nextGeneration();


	//noFill();
	// beginShape();
	// stroke(255);
	// color(255, 0, 0);
	// noFill();
	// for (var i = 0; i < bestPath.length; i++) {
	// 	let n = bestPath[i]; // refiere al array ordenado, like lookup table
	// 	vertex(cities[n].x, cities[n].y);
	// }
	// endShape();

	// informacion 
	textSize(12);

	//text(pp + " faltan : " + remainingTime + "  segs", 10, height - 10);
	stroke(255);
	fill(0, 0, 240);
	//rect(width - 15, height - 100, 10, 100 * pp / totalPermutations);
	stroke(255, 0, 0);
	strokeWeight(6);
	color(255, 0, 0, 44)
	drawBestPath(bestPath);
	//translate(0,height/2);
	stroke(255);
	strokeWeight(1);
	color(255,11)
	drawBestPath(currentBest);
}

function swap(arr, a, b) {
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
	return arr;
}




function factorial(n) {
	var ff = 1;
	for (let ii = 1; ii < n + 1; ii++) {
		ff = ff * ii;
	}
	return ff;
}