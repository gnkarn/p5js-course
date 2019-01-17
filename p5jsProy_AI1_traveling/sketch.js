// fuerza bruta , recorre las alternativas de manera aleatoria
// buscando un camino de menor longitud


let cities = [];
let totalCities = 5;
let bestPath = [];
let recordDistance = 9999999999999;
let newDist = 0;
let dato;

function setup() {
	createCanvas(400, 300);
	background(51);
	for (var i = 0; i < totalCities; i++) {
		let v = createVector(random(width), random(height));
		cities[i] = v;
	}
	recordDistance  = calcDistance(cities);
	dato=createP("Distancia : ");
	bestPath=cities;
}

function draw() {
	background(51, 44);
	fill(255);
	for (var i = 0; i < cities.length; i++) {
		ellipse(cities[i].x, cities[i].y, 10, 10);
	}
	noFill();
	beginShape();
	stroke(255);  
	//color(255, 0, 0);
	noFill();
	for (var i = 0; i < cities.length; i++) {
		vertex(cities[i].x, cities[i].y);
	}
	endShape();

	var i = floor(random(cities.length));
	let j = floor(random(cities.length));
	swap(cities, i, j);
	newDist = calcDistance(cities);

	if (newDist < recordDistance) {
		bestPath = cities.slice(0,cities.length); // copio cities array a bestPath
		recordDistance = newDist;
		console.log(newDist);
		dato.html(" " + floor(newDist),append);
		drawBestPath(bestPath);
	}
	drawBestPath(bestPath);

}

function drawBestPath(best) {
	stroke(255, 0, 0);
	strokeWeight(4);
	color(255, 0, 0, 44);
	noFill();
	beginShape();
	for (var i = 0; i < best.length; i++) {
		vertex(best[i].x, best[i].y);
	}
	endShape();
	strokeWeight(1);
	stroke(255);
}

function swap(a, i, j) {
	let temp = a[j];
	a[j] = a[i];
	a[i] = temp;
}

function calcDistance(points) {
	let sum = 0;
	for (let i = 0; i < points.length - 1; i++) {
		sum += p5.Vector.dist(points[i], points[i + 1]);

	};
	//console.log(sum);
	return sum;
}