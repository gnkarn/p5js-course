// las burbujas aparecen al presionar el mouse
// en sus coordenadas


let bubble = [];
var n = 0;
var bubbleNum = 0;

function setup() {
	createCanvas(600, 400);
	

}

function mouseDragged(){
	bubble[0].x=mouseX;
	bubble[0].y=mouseY;
}
function mousePressed() {
	let b = new Bubble(mouseX, mouseY, random(5, 100), random(5, 255), random(15, 255), 0);
	bubbleNum += 1;
	bubble.push(b);
	print(bubble.length);
	print(mouseX, mouseY);
}

function draw() {
	background(0);

	for (let bub of bubble) {
		flagOverlap = false;
		bub.move();
		bub.show(n);
		bub.color = (200 * bub.rollover(mouseX, mouseY)); // change segun toque la burbuja , rollover  retorna true false
		for (let other of bubble) {
			if (bub !== other && bub.intersects(other)) {
				
				bub.changeStroke(true);
				flagOverlap = true;
			}
			if (flagOverlap == false) {
				bub.changeStroke(false);
			}
		}
	}


	//	for (var i = 0; i < bubble.length; i++) {
	//		bubble[i].move();
	//		bubble[i].show(n);
	//	}
	n = n + 1; // para animaciones que solo dependen del tiempo
}