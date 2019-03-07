// 2017 Google Summer of Code Grand Wrap - Up Post: https: //medium.com/@ProcessingOrg/201...
// Three.js: https: //threejs.org/
// p5.js reference: https: //p5js.org/reference/
// Getting started with WebGL in p5: https: //github.com/processing/p5.js/w...

// 	Source Code
// for the all Video Lessons: https: //github.com/CodingTrain/Rainbo...

//https: //github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5
let foto;
let cam;

// function preload() {
// 	foto = loadImage("pilu.jpg");
// }

let angle = 0;

function setup() {
	createCanvas(400, 300, WEBGL);
	background(175);
	strokeWeight(1);
	//cam = createCapture(VIDEO);
}

function draw() {
	background(55);
//	camera(200, 200, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);
	//perspective(fovy, aspect, near, far)
	let fov=PI/2;
	let cameraZ=(height/2)/tan(fov/2);// default location
	//console.log(cameraZ);
	perspective(fov, width / height, cameraZ / 10, cameraZ * 10);
	//perspective(fov, width/height,cameraZ/10, cameraZ*10);
	push();

	ambientLight(150);
	pointLight(0, 0, 255, 0, 0,100);
	stroke(255);
	pointLight(0, 50, 255, 200, 250, 200);
	directionalLight(255, 50, 0, -1, 0, 0);
	directionalLight(0, 250, 0, 1, 0, 0);
	rectMode(CENTER);
	//stroke(255);
	noStroke();
	translate(0, 0, 0);
	rotate(angle);
	rotateY(angle);
	
	//sphere(150,20,20);
	ambientMaterial(255, 255, 255);
	//specularMaterial(255, 255,255);
	//box(150);
	//normalMaterial();// asocia al vector normal un color

	//	torus(100, 30);
	//texture(foto); // puedo usar cam
	box(100);

	angle = angle + .011;

	pop();
	//texture(cam);
	translate(0,  200,0);
	rotateX(1);
	plane(width, height);



}