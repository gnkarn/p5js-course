// custom shapes
// se dibuja en un canvas de bauffer , y se llama con la funcion image
//en ese momento se pasa al canvas 
//la ventaja es que el canvas lo puedo borrar en cada frame
// mientras el dibujo continua en la imagen
//asi se pueden superponer , imagenes instantanteas del canvas 
//con una persistente que traigo desde el buffer

var r = 50;
graf.pixelDensity(1);
pixelDensity(1);

function setup() {
	angleMode(DEGREES);
	createCanvas(300, 300);
	fill(200);
	stroke(255, 222, 0, 200);
	background(25);
	noFill();
	graf = createGraphics(300, 300);
	graf.beginShape();
	graf.noFill();
	graf.stroke(110, 150, 150, 200);
	var delta = 10;
	graf.background(0,0,0,0);

	
	for (var i = 0; i < 360; i += delta) {
		r = r - .5;
		var x = 200 + r * cos(i * 2 * PI);
		var y = 200 + r * sin(i * 2 * PI);
		graf.vertex(x, y);
		graf.endShape(CLOSE);
		
		
	
	}
//	imageMode(CENTER);
}

function draw() {
	//graf.tint(255,0);
	graf.fill(100,100,100,100);
	graf.ellipseMode(CENTER);
	graf.ellipse(mouseX, mouseY, 10, 10);
	graf.noStroke();
	background(0);
	image(graf, 0,0);
	
	stroke(222, 100, 100, 100);
	strokeWeight(4);
	beginShape();
	vertex(50, 50);
	bezierVertex(100, 100, 150, 200, mouseX, mouseY);
	endShape();
	fill(200);
	ellipse(mouseX,mouseY,40,40);
	noFill();
}