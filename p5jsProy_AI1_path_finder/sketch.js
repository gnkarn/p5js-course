// Daniel Shiffman
// http://codingtra.in
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU


let cols = 25;
let rows = 25;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
let w, h;
var path = [];

function setup() {
	createCanvas(400, 400);
	// para escala del grafico
	w = width / cols;
	h = height / rows;
	background(51);

	// making 2d array
	for (let i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}
	// agrego los neighbors
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}

	//	arranca arriba ala izq y termina abajo a la derecha
	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	ellipseMode(CENTER);
	start.wall = false;
	end.wall = false;

	openSet.push(start);

}



// como no existe una funcion para sacar un elemento del array
function removeFromArray(arr, element) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == element) {
			arr.splice(i, 1);
			//array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
		}

	}
}

// calcula la menor distancia del nodo actual al final
function heuristic(a, b) {
	let d = dist(a.i, a.j, b.i, b.j);
	return d;
}

function draw() {
	//console.log(openSet);
	if (openSet.length > 0) {
		//	keep going, buscar el nodo con menor f
		let winner = 0;
		for (let i = 0; i < openSet.length; i++) {
			console.log("openset " + openSet[i].f);
			console.log("winner " + openSet[winner].f);
			if (openSet[i].f < openSet[winner].f) {

				winner = i;
			}

		}
		//console.log(openSet[winner]);
		var current = openSet[winner];


		//termine ?
		if (current === end) {
			// listo
			console.log(" done !");
			noLoop();
		}

		// Best option moves from openSet to closedSet
		removeFromArray(openSet, current);
		closedSet.push(current);

		// Check all the neighbors
		var neighbors = current.neighbors; // para acortar el nombre
		for (let i = 0; i < neighbors.length; i++) {
			let neighbor = neighbors[i];
			// Valid next spot?
			if (!closedSet.includes(neighbor) && !neighbor.wall) { // si aun no lo habia evaluado
				let tempG = current.g + heuristic(neighbor, current); // al moverme uno aumento el costo tentativo que tenia en 1 ( podria ser una distancia variable entre nodos)

				// es un mejor camino que los anteriores?
				let newPath = false;
				if (openSet.includes(neighbor)) {
					if (tempG < neighbor.g) {
						neighbor.g = tempG; // este camino es mejor que uno evaluado anterior
						newPath = true;
					}
				} else {
					neighbor.g = tempG;
					newPath = true;
					openSet.push(neighbor); // new node discovered, no estaba en openset
				}
				// yes is better
				if (newPath) {
					neighbor.h = heuristic(neighbor, end); // menor costo futuro estimado
					neighbor.f = neighbor.g + neighbor.h; // score total del nodo, por ahora
					neighbor.previous = current; // desde donde viene
				}
			}


		}
	} else {
		// no solution
		console.log("no solution");
		noLoop();
		return;
	}
	background(0);

	// mostrar la grilla
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].show(color(255));
		}
	}

	for (let i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(0, 200, 0, 50));

	}
	for (let i = 0; i < openSet.length; i++) {
		openSet[i].show(color(255, 0, 0, 50));

	}

	// for(let i=0;i<path.length;i++){
	// 	path[i].show(color(100,200,50));

	// }

	// find the path , la cadena hacia atras 
	path = [];
	var temp = current;
	path.push(temp);
	while (temp.previous) {
		path.push(temp.previous);
		temp = temp.previous;
	}
	// draw path as a line
	noFill();
	stroke(255, 0, 200);
	strokeWeight(3);
	beginShape();
	for (let i = 0; i < path.length; i++) {
		vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
	}
	endShape();
}