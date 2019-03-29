// non simetric , tree, reload page for a new tree

let angle = 0;
let slider;

function setup() {
	createCanvas(400, 400);
	slider = createSlider(0, 2 * PI, PI / 5, PI / 90);
}

function draw() {
	background(51);
	stroke(255);
	translate(200, height);
	angle = PI / 6;
	branch(100);
	noLoop();
}

function branch(len) {
	strokeWeight(len / 16);
	line(0, 0, 0, -len);
	translate(0, -len);
	push();
	angle = slider.value();

	if (len > 4) {
		rotate(angle);
		branch(len * random(.6, .8));
	}
	pop();
	if (len > 4) {
		rotate(-angle);
		branch(len * random(.5, .9));
	}

}