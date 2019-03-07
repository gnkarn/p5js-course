let angle = 0;
let kitten;
let txt;
let graphics;

function preload() {
	kitten = loadImage('pilu.jpg')
}
//angleMode(DEGREES);

function setup() {
	createCanvas(400, 300, WEBGL);
	graphic = createGraphics(200, 200);
	graphic.background(255);

	txt = createGraphics(200, 200);
	txt.background(255, 0, 0, 200);
	txt.fill(255);
	txt.textAlign(CENTER);
	txt.textSize(45);
	txt.text('Gustavo', 90, 100);

}

function draw() {
	background(0);

	graphic.fill(255, 0, 255);
	graphic.ellipse(mouseX, mouseY, 5);
	ambientLight(100);
	directionalLight(0, 255, 0, 0,0, -1);

	rotateX(angle);
	rotateY(angle * 1.3);
	rotateZ(angle * 0.7);
	fill(0, 0, 0, 11);
	texture(txt); // kitten
	stroke(255);

	box(100);
	angle += .03;
}