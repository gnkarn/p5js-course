let fluid;
let canvas;
let t = 0; //time

function setup() {
	canvas = createCanvas(N * SCALE, N * SCALE);
	fluid = new Fluid(2, 0.0001, .0000001);

}

function mouseDragged() {
	fluid.addDensity(int(mouseX / SCALE), int(mouseY / SCALE), 200);
}

function draw() {
	background(0);

	let cx = int(0.5 * width / SCALE);
	let cy = int(0.5 * height / SCALE);
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			fluid.addDensity(cx + i, cy + j, 1000);
		}
	}
	for (let i = 0; i < 2; i++) {
		let angle = noise(t) * TWO_PI;
		let v = p5.Vector.fromAngle(angle);
		v.mult(.1);
		//console.log(v);
		t += .01;
		fluid.addVelocity(cx, cy, v.x, v.y);
	}
	fluid.step();
	fluid.renderD();
	//	fluid.renderV();
	fluid.fadeD();
}