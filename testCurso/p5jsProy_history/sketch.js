var particles = [];

function setup() {
	createCanvas(400, 300);
	// particles[1] = new Particle(200, 100);
	// particles[2] = new Particle(300, 200);
	background(200);
	print("presiona el mouse para generar nueva particula");
}

function mousePressed(){
	particles.push(new Particle(mouseX,mouseY));
}

function draw() {
	background(200);

	particles.forEach(element => {
		element.update();
		element.show();
	});

}