var vertices = [];

function setup() {
	createCanvas(600, 400);
	background(200);
}

function mousePressed() {
	var v = createVector(mouseX, mouseY);
	vertices.push(v);
	print(vertices.length);
}

function draw() {
	background(51);
	var reached = [];
	var unreached = [];

	//meto todos los vertices en unreached
	for (var i = 0; i < vertices.length; i++) {
		unreached.push(vertices[i]);
	}

	reached.push(unreached[0]); // pongo el punto de partida
	unreached.splice(0, 1); // y lo saco  de aqui

	while (unreached.length > 0) {

		var shortest = 10000 // record inicial
		var reachedIndex; //guarda los indices de cada segmento conectado
		var unreachedIndex;

		for (var i = 0; i < reached.length; i++) {
			for (var j = 0; j < unreached.length; j++) {
				var v1 = reached[i];
				var v2 = unreached[j];
				var d = dist(v1.x, v1.y, v2.x, v2.y);
				print(d);
				if (d < shortest) {
					shortest = d;
					reachedIndex = i;
					unreachedIndex = j;
				}
			}

		}
		line(reached[reachedIndex].x, reached[reachedIndex].y, unreached[unreachedIndex].x, unreached[unreachedIndex].y);
		reached.push(unreached[unreachedIndex]); // to get started lo agregao aqui
		unreached.splice(unreachedIndex, 1); // y lo saco  de aqui
	}



	for (var i = 0; i < vertices.length; i++) {
		fill(255);
		stroke(255);
		ellipse(vertices[i].x, vertices[i].y, 16, 16);
	}
}