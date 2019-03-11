// module aliases
var Engine = Matter.Engine,
	//	Renderer = Matter.Render,
	World = Matter.World,
	Bodies = Matter.Bodies;

let engine;
let boxes = [];
let world;

let ground;
let boundaries = [];


function setup() {
	createCanvas(600, 600);
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	//console.log(box1);
	let options = {
		isStatic: true,
		friction: .1,
		restitution: .6,
		angle: .03
	}
	ground = new Boundary(200, height, width, 10, options);

	options = {
		isStatic: true,
		friction: 11,
		restitution: .6,
		angle: PI / 6
	}
	boundaries.push(new Boundary(200, 200, width - 200, 15, options));
	options = {
		isStatic: true,
		friction: .1,
		restitution: .6,
		angle: -PI / 6
	}
	boundaries.push(new Boundary(350, 400, 200, 15, options));
}

function mouseDragged() {
	//boxes.push(new Box(mouseX, mouseY, random(2, 25), random(2, 25)));
	boxes.push(new Circle(mouseX, mouseY, random(2, 10)));


}

function draw() {
	Engine.update(engine);

	background(44);
	for (let b =0; b< boxes.length;b++) {
		boxes[b].show();
		if (boxes[b].isOffScreen()){
			boxes[b].removeFromWorld(); // los elimina desde matter
			boxes.splice(b,1); // elimina los que salen de la pantalla
			console.log("boxes " + boxes.length);
			console.log("bodies " + world.bodies.length);
			b--;
		}
	}
	ground.show();
	for (let bound of boundaries) {
		bound.show();
	}

}