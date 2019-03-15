// module aliases
var Engine = Matter.Engine,
	//	Renderer = Matter.Render,
	World = Matter.World,
	Events = Matter.Events,
	Bodies = Matter.Bodies;

let engine;
let boxes = [];
let world;

let ground;
let boundaries = [];
let particles = [];
let plinkos = [];
let cols = 11;
let rows = 9;
let buckets = 6; // numero de buckets

function preload() {
	ding = loadSound('ding.mp3');
}

function setup() {
	createCanvas(400, 600);
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	world.gravity.y = .6;
	let options = {
		isStatic: true,
		friction: .1,
		restitution: .6,
		angle: 0
	}
	function collision(event){
	let pairs=event.pairs;
	
	for (let i=0;i<pairs.length;i++){
		let labelA=pairs[i].bodyA.label;
		let labelB= pairs[i].bodyB.label;
		 if(labelA=="particle" && labelB=="plinko"){
			 ding.play();
		 }
		 if (labelB == "particle" && labelA == "plinko") {
		 	//ding.play();
		 }
	}
	}
	Events.on(engine, 'collisionStart', collision);
	// pone el piso
	boundaries.push(new Boundary(200, height, width - 20, 10, options));
	// add buckets
	options = {
		isStatic: true,
		friction: 11,
		restitution: .6,
		angle: TWO_PI / 4
	}
	let bd = width / buckets; // separacion entre buckets
	for (let i = 0; i <= buckets; i++) {
		boundaries.push(new Boundary(i * bd, height - boundaries[0].h - 35, 70, 15, options));
	}
	// pone los topes (plinkos)
	let spacing = width / cols;
	let offset = 20;
	let fila = 0;
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			plinkos.push(new Plinko(offset * fila + i * spacing, 100 + j * spacing, 10, true));
		}
		fila = (j % 2 == 0);
	}
}

function newParticle() {
	//particles.push(new Particle(mouseX, mouseY, random(2, 10)));
	particles.push(new Particle(random(width / 2 - 10, width / 2 + 10), 0, 8));

}

function mousePressed() {
	ding.play();
}

function draw() {
	Engine.update(engine, 1000 / 60); // actualiza la fisica

	background(0);
	if (frameCount % 30 == 0) {
		newParticle();
	}
	for (let p = 0; p < particles.length; p++) {
		particles[p].show();
		if (particles[p].isOffScreen()) {
			particles[p].removeFromWorld(); // los elimina desde matter
			particles.splice(p, 1); // elimina los que salen de la pantalla
			console.log("particles " + particles.length);
			console.log("bodies " + world.bodies.length);
			p--;
		}
	}
	//console.log(frameRate());
	for (let pl of plinkos) {
		pl.show();
	}

	for (let bo of boundaries) {
		bo.show();
	}
}