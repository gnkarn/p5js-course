// module aliases
var Engine = Matter.Engine,
	//	Renderer = Matter.Render,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Constraint = Matter.Constraint,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse;

let engine;
let boxes = [];
let world;

let ground;
let boundaries = [];
let particles = [];


function setup() {
	let canvas = createCanvas(600, 600);
	engine = Engine.create();
	world = engine.world;
	//	Engine.run(engine);
	//console.log(box1);
	let options = {
		isStatic: true,
		friction: .1,
		restitution: .6,
		angle: .03
	}
	boundaries.push(new Boundary(200, height, width, 10, options));
	let prev = null;
	// fija el primer eslabon de la cadena
	let p = new Particle(250, 100, 10, true);
	particles.push(p);
	prev = p;
	// arma la cadena saltando el primero
	for (let x = 260; x < width; x += 40) {
		p = new Particle(x, 100, 10);
		particles.push(p);
		if (prev) {
			options = {
				bodyA: p.body,
				bodyB: prev.body,
				stiffness: .3,
				length: 35
			}
			let constraint = Constraint.create(options);
			World.add(world, constraint);
		}
		prev = p;
	}
	let canvasMouse = Mouse.create(canvas.elt);
	canvasMouse.pixelRatio=pixelDensity();// para dislays de alta resolucion
	options = {
		mouse: canvasMouse,
	}

	mConstraint = MouseConstraint.create(engine, options);
	World.add(world, mConstraint);
}

// function mouseDragged() {
// 	//boxes.push(new Box(mouseX, mouseY, random(2, 25), random(2, 25)));
// 	particles.push(new Particle(mouseX, mouseY, random(2, 10)));

// }

function draw() {
	Engine.update(engine);
	background(44);
	for (let b = 0; b < particles.length; b++) {
		particles[b].show();
		if (particles[b].isOffScreen()) {
			particles[b].removeFromWorld(); // los elimina desde matter
			particles.splice(b, 1); // elimina los que salen de la pantalla
			console.log("particles " + particles.length);
			console.log("bodies " + world.bodies.length);
			b--;
		}
	}
	for (let bound of boundaries) {
		bound.show();
	}

	// resalta la seleccionada con mouse
if(mConstraint.body){
	let pos=mConstraint.body.position;
	let offset=mConstraint.constraint.pointB;// desde el punto donde toco el mouse
	let m=mConstraint.mouse.position;
	stroke(0,255,0);
	line(pos.x+offset.x,pos.y+offset.y,m.x,m.y);
}

}