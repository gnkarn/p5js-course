let foto;
let cam;

function preload() {
	 foto = loadImage("pilu.jpg");
}

let angle = 0;

function setup() {
	createCanvas(400, 300, WEBGL);
	background(175);
	strokeWeight(1);
	cam= createCapture(VIDEO);
}

function draw() {
	background(55);
	push();

	ambientLight(150);
	pointLight(255, 250, 255, mouseX - width / 2, mouseY);
	stroke(255);
	line(mouseX - width / 2, mouseY - height / 2, 100, 0, 0, 0);
	pointLight(0, 0, 255, 200, 250, 200);
	directionalLight(255, 50, 0, -1, 0, 0);
	directionalLight(0, 250, 0, 1, 0, 0);
	rectMode(CENTER);
	//stroke(255);
	noStroke();
	translate(mouseX-width/2,mouseY-height/2);
	rotate(angle);
	rotateY(angle);
	//sphere(150,20,20);
	ambientMaterial(255, 255, 255);
	//specularMaterial(255, 255,255);
	//box(150);
	//normalMaterial();// asocia al vector normal un color

	//	torus(100, 30);
	texture(foto);// puedo usar cam
	box(100 );
	angle = angle + .011;
	pop();
	texture(cam);
	rotateX(1);
	plane(width, height);
	
	

}