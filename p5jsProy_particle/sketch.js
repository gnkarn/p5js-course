let particles;



function setup() {
	createCanvas(400, 300);
	particles = Array(200).fill().map(p => new Particle());
	console.log(particles);
}

function draw() {

	background(0, 44);
	for (let i = 0; i < (200 - particles.length); i++) {
		let p = new Particle();
		particles.push(p);
		//console.log(particles.length);
	}
	particles = particles.sort((a, b) => a.col - b.col); //los mas brillantes adelante
	//particles.forEach(p=>p.update());// es igual que el siguiente loop
	for (let part of particles) {
		part.update();
		part.show();

	}
	particles = particles.filter(p => !p.finished()); // pues filter retorna un nuevo array entonces, lo debo reasignar
	let sumx = particles.reduce((x, p) => x + p.x, 0); // para calcular el centroide
	let sumy = particles.reduce((y, p) => y + p.y, 0);
	let cx = sumx / particles.length;
	let cy = sumy / particles.length
	fill(255, 0, 0);
	ellipse(cx, cy, 20, 20);//centroide
}