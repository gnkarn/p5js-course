// habria que revisar todo el modelo , pues asi como esta
// ningun foton queda orbitando el BH

const c = 30;
const G = 3;
let m87;
let particles = [];
const dt = .1;



function setup() {
	createCanvas(800, 600);
	ellipseMode(RADIUS);
		background(200);
	m87 = new blackHole(200, height/2, 3755);

	let start = height/2 ;
	let end = height / 2 - m87.rs * 2.6;


	for (let y = 0; y < start; y += 5) {
		particles.push(new Foton(width - 20, y));	
		//console.log(y);
	}
}

function draw() {
background (200);
	m87.show();
	for (let p of particles) {
		m87.pull(p);
		p.update();
		p.show();
	}
}