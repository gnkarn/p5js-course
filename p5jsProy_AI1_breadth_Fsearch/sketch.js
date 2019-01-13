//https://www.youtube.com/watch?v=-he67EEM6z0&list=PLRqwX-V7Uu6bePNiZLnglXUp2LXIjlCdb&index=5
// The Nature of Code Part 2(Spring 2017) - Intelligence and Learning: https: //github.com/shiffman/NOC-S17-2...
// 	Nature of Code: http: //natureofcode.com/
// 	My Video on Prototypes: https: //youtu.be/hS_WqkyUah8
// 	My Video on Associative Arrays: https: //youtu.be/_5jdE6RKxVk
// 	The Oracle of Bacon: http: //oracleofbacon.org/
// 	Breadth - First Search on Wikipedia: https: //en.wikipedia.org/wiki/Breadth...

let data;
let graph;
let dropdown;

function preload() {
	data = loadJSON('kevinbacon.json');

}

function setup() {
	noCanvas();
	//console.log(data);
	graph = new Graph();

	dropdown = createSelect();
	dropdown.changed(bfs);
	// agregar movies
	let movies = data.movies;
	for (let i = 0; i < movies.length; i++) {
		let movie = movies[i].title;
		let cast = movies[i].cast;
		let movieNode = new Node(movie);
		graph.addNode(movieNode);
		// agregar los actores
		for (let j = 0; j < cast.length; j++) {
			let actor = cast[j];
			let actorNode = graph.getNode(actor);
			if (actorNode == undefined) { // lo agrego solo si aun no existe
				actorNode = new Node(actor);

				dropdown.option(actor); // agrega el actor al selector 
			}
			graph.addNode(actorNode);
			movieNode.addEdge(actorNode);
			//console.log(actor);
		}
	}



	function bfs() {
		graph.reset();

		let start = graph.setStart(dropdown.value()); //
		let end = graph.setEnd("Kevin Bacon");
		console.log(start);
		// BFT 
		let queue = [];
		start.searched = true;
		queue.push(start);

		while (queue.length > 0) {
			let current = queue.shift();
			if (current == end) {
				console.log("found " + current.value);
				break;
			}
			let edges = current.edges;
			for (let i = 0; i < edges.length; i++) {
				let neighbor = edges[i];
				if (!neighbor.searched) {
					neighbor.searched = true;
					neighbor.parent = current;
					queue.push(neighbor);

				}
			}
		}

		// recorre el caminio de atras adelante
		// y va colocando los nodos relacionados en el array path
		let path = [];
		path.push(end);
		let next = end.parent;
		while (next != null) {
			path.push(next);
			next = next.parent;

		}
		let txt = ' ';
		for (let i = path.length - 1; i >= 0; i--) {
			let n = path[i];
			txt += n.value;
			if (i != 0) {
				txt += "-->";
			}

		}
		createP(txt);
	}
}

function draw() {

}

// faltaria hacer un grafico quemuestre las relaciones entre peliculas y actores
// con nodos y lineas