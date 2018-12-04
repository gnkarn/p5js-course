let angle = 0;

function setup() {
	createCanvas(300, 300);
	angleMode(DEGREES);
	translate(50, 50);
	stroke(255)
	noFill();
	translate(150, 150);
	rect(0, 0, 100, 50);
	background(100);
	rectMode(CENTER); // centra el rectangulo
	ellipseMode(CENTER);
}

function draw() {
	background(0, 0, 100, 2);
	push();
	rotate(-2 * angle);
	rect(50, 50, 100, 50)
	pop();


	translate((150 + 150 * sin(angle)) * 0 + mouseX, mouseY); // traslada los ejes segun el mouse en y , y una senoidal en x
	//	translate(100, 100);
	push();
	rotate(angle);
	line(0, 0, 0, 50);
	//translate(50,50);	
	fill(100, 220, 50);
	rect(0, 0, 100, 50)
	pop();

	fill(255, 100, 50);
	rotate(-2 * angle);
	rect(0, 0, 100, 50);


	rotate(angle / 10);
	translate(100 - 50, 100);
	ellipse(0, 0, 10);

	rotate(angle * 10);
	line(0,0,30,0);
	translate(30, 0);
	ellipse(0, 0, 5);





	//	translate((150 + 150 * sin(angle)) * 0 + mouseX, mouseY); // traslada los ejes segun el mouse en y , y una senoidal en x
	//rotate(angle);
	//rect(50, 50, 100, 50);

	angle = angle + .1; // gira

}