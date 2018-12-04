// aparecen imagenes de flores al presionar el mouse
// cuando chocan se enmarcan en un circulo y cambian a un gatito aleatorio
// se registra en el objeto si esta en condicion de solapamiento con otro

// CONTROL DE DOM
//el boton cambia el color de fondo 
//se indica la candidad de objetos que estan en colision en tiempo real

let bubble = [];
var n = 0;
var bubbleNum = 0;
let kittens = [];
var choques = 0;
var button;
var bgcolor=0;

function preload() {
	flower = loadImage('flower.png');
	for (let i = 0; i < 5; i++) {
		kittens[i] = loadImage(`kitten${i}.jpg`);
	}
}

function setup() {
	createCanvas(600, 400);
	createP("Burbujas y gatitos  con interseccion")
	h2 = createElement('h2', "Numero de choques: " + "0");
	button=createButton("color");
	button.mousePressed(changeColor);
	slider=createSlider(20, 250, 30,5);// bubble size
	sliderEsc=createSlider(0,10,1,.5); // bubble scale

}

function changeColor(){
	bgcolor= color(int(random(255)));
}

function mouseDragged() {
	bubble[0].x = mouseX;
	bubble[0].y = mouseY;
}

function mousePressed() {
	//constructor(_x, _y, _r, _color, _frec, _stroke = 150, _img, _intersect = false)
	let b = new Bubble(mouseX, mouseY, slider.value(), random(5, 255), 100, flower);
	bubbleNum += 1;
	bubble.push(b);
	print(bubble.length);
	print(mouseX, mouseY);
}

function draw() {
	background(bgcolor);

	for (let bub of bubble) {
		flagOverlap = false;
		bub.move();
		bub.show(n);
		for (let other of bubble) {
			if (bub !== other && bub.intersects(other)) {
				bub.changeStroke(true);
				bub.img = random(kittens); // si se chocan cambia la imagen del gatito aleatoriamente y la deja
				flagOverlap = true;
			}
			if (flagOverlap == false) {
				bub.changeStroke(false);

			}
		}
	}
	choques = 0;
	for (i=0;i<bubble.length; i++) {
		choques = choques + bubble[i].intersect;
		h2.html("Numero de choques: " + choques);
	}

	n = n + 1; // para animaciones que solo dependen del tiempo
}