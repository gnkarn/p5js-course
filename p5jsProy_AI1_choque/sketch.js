// esta simulacion requiere de una mayor precision en el calculo de las posiciones y los rebotes
// habria que hacer un microzoom en la distancia entre ambos, para estudiar 
// la frecuencia de rebote contra la pared,
// aqui se presenta un problema de resolucion para el calculo de la velocidad y por tanto de x
// no me da el valor de pi

let v1 = -123;
let v0 = 0;
let p = [];
let m1 = 100000;
let m0 = 100;
let choques = 0;
let w = 30;
let zoom = 1000;
let nroChoques;


function setup() {
	frameRate(50);
	createCanvas(600, 300);

	p[0] = new Particle(200, 0, m0, 255);
	p[1] = new Particle(300, v1, m1, 0);
	nroChoques = createP(choques);
	}

function draw() {
	fill(200);
	background(0, 122);
	ellipseMode(CENTER);
	

	for (let part of p) {
		part.update();
		part.show();

	}
	//particles = particles.filter(p => !p.finished()); // pues filter retorna un nuevo array entonces, lo debo reasignar
	// let sumx = particles.reduce((x, p) => x + p.x, 0); // para calcular el centroide
	// let cx = sumx / particles.length;
	// fill(255, 0, 0);
	//ellipse(cx, cy, 20, 20); //centroide
	//console.log(p[0].x , p[1].x);
	if (collision()) {
	nroChoques.html(choques);
		
	}
}

function collision() {

	if ((p[0].x - w / 2) * zoom < 0) {
		p[0].v = -p[0].v;
	} // choco contra la pared
	if (p[1].x <= 1.5 * w) {
		p[1].v = -p[1].v;
	}
	let distancia = (p[1].x - (p[0].x + w)) * zoom;
	if (distancia <= 0 || p[0].x == p[1].x - w) {
		choques += 1;
		//console.log(choques);
		// change velocity chocaron

		let ms = p[0].m + p[1].m;
		let mr = p[0].m - p[1].m;
		//console.log(raiz);

		let newv0 = p[0].v * mr / ms + 2 * p[1].m / ms * p[1].v;
		let newv1 = 2 * p[0].m / ms * p[0].v - mr / ms * p[1].v;
		console.log(newv1, newv0);

		p[0].v = newv0;
		p[1].v = newv1;

	}
	return choques;
}
class Particle {
	constructor(xp, vel, m, col) {
		this.x = xp;
		this.y = height - 20;
		this.v = vel/64;
		this.col = col;
		this.alpha = 255;
		this.m = m;
	}
	finished() {
		return;
	}

	update() {

		this.x += this.v ;
		this.alpha -= 4;
	}

	show() {
		noStroke();
		fill(this.col, 50, 0); //this.alpha

		ellipse(this.x, this.y, w);
	}

}