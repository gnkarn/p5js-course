let total = 500;// numero de divisiones del circulo
let n = 2; // multiplicador ( del punto a al punto 2*a)
let r;

// en funcion del punto en el circulo, crea su vector
function getVector(index) {
	let angle = map(index, 0, total, 0, TWO_PI);
	let v = p5.Vector.fromAngle(angle);
	v.mult(r);
	return v;
}

function setup() {
	createCanvas(400, 400);
	r = width / 2;
	
}

function draw() {
	background(0);
	translate(width / 2, height / 2);

	for (let i = 0; i < total; i++) {
		let angle = map(i, 0, total, 0, TWO_PI);
		let v=getVector(i);

		stroke(255, 0, 0);
		strokeWeight(4);
		point(v.x, v.y);
		stroke(120,100);
		strokeWeight(1);
		noFill();
		ellipse(0, 0, 2 * r);
	}
// calcula el vector para cada punto i en la circunsferencia
	for (let i = 0; i < total; i++) {
		let a = i;
		let b = n * i;
		let p1=getVector(a);
		let p2=getVector(b);
		stroke(255,44);
		// linea desde el punto a al punto b
		line(p1.x, p1.y, p2.x, p2.y);
	}
	// frena si presiona el mouse
	if (!mouseIsPressed){
n=n+.01;}
}