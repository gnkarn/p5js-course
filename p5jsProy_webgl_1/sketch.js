	// 2017 Google Summer of Code Grand Wrap - Up Post: https: //medium.com/@ProcessingOrg/201...
	// Three.js: https: //threejs.org/
	// p5.js reference: https: //p5js.org/reference/
	// Getting started with WebGL in p5: https: //github.com/processing/p5.js/w...

	// 	Source Code
	// for the all Video Lessons: https: //github.com/CodingTrain/Rainbo...

	let angle = 0;

	function setup() {
		createCanvas(400, 300, WEBGL);
		background(175);
		strokeWeight(1);
	}

	function draw() {
		background(55);
		ambientLight(22);
		pointLight(255, 250, 255, mouseX - width/2, mouseY);
		stroke(255);
		line(mouseX - width / 2, mouseY-height/2,100, 0, 0,0);
		pointLight(0, 0, 255, 200, 250, 200);
		directionalLight(255, 50, 0, -1, 0,0);
		directionalLight(0, 250, 0, 1, 0, 0);
		rectMode(CENTER);
		//stroke(255);
		noStroke();
		//fill(0, 0, 255);
		//translate(mouseX-width/2,mouseY-height/2);
		rotate(angle);
		rotateY(angle);
		//sphere(150,20,20);
		ambientMaterial(255, 255, 255);
		//specularMaterial(255, 255,255);
		box(150);
		//normalMaterial();// asocia al vector normal un color

		torus(100, 30);
		angle = angle + .011;

	}

	
	