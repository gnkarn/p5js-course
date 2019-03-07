let cols, rows;
let w = 20;
let grid = [];
let current;
let order = 0;

let stack=[];

function setup() {
	createCanvas(600, 600);
//	frameRate(50);

	cols = floor(width / w);
	rows = floor(height / w);

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let cell = new Cell(i, j);
			grid.push(cell);

		}
	}

	current = grid[0]; // donde comienza el laberinto
}

// calcula index del array de celdas puestos como serpentine
function index(i, j) {
	if (i < 0 || j < 0 || i > (cols - 1) || j > (rows - 1)) {
		// invalid , is at the edge
		return -1;
	}
	return (i + j * cols);
}


function draw() {
	background(51,44);
	for (let i = 0; i < grid.length; i++) {
		grid[i].show();
	}
	current.visited = true;
	current.highlight();


	// STEP 1
	var proximo = current.checkNeighbors(); // elijo un vecino al azar si existe y no fue visitado
	if (proximo) { // si no es undefined
		console.log(proximo);
		proximo.visited = true;
		//STEP2
		stack.push(current);

		// STEP 3
		removeWalls(current, proximo);

		// STEP4
		current = proximo;

		let x = current.i * w;
		let y = current.j * w;
	
		text(order, x, y);
	}else if (stack.length >0){ // si quedo bloqueado , y tengo elementos en el stack
		current =stack.pop();
	}



}

function removeWalls(a, b) {
	let x = a.i - b.i;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else {
		if (x === -1) { // saca la pared derecha de a e izquierda de b
			a.walls[1] = false;
			b.walls[3] = false;
		}
	}
	let y = a.j - b.j;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else {
		if (y === -1) { // saca la pared derecha de a e izquierda de b
			a.walls[2] = false;
			b.walls[0] = false;
		}
	}
}