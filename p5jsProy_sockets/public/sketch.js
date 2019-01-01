// https://socket.io/docs/#Javascript-Client
// socket .io tambien lo puedo bajar en liugar de cargarlo desde cdn
// codigo del cliente
var socket;
var x = 0;
var y = 0;

function setup() {
	createCanvas(200, 200);
	background(51);
	socket = io.connect('http://localhost:3000'); // conecta al servidor node
	socket.on('mouse', received);// si recibe mouse desde el server
}

function mouseDragged() {
	noStroke();

	fill(255);
	ellipse(mouseX, mouseY, 29, 29);
	var data = { // message to send
		x: mouseX,
		y: mouseY
	}

	socket.emit('mouse', data); // envia el socket con name y data

}



function received(data) {
	 x = data.x;
	 y = data.y;
	 noStroke();
	 	fill(255, 0, 0);
	 	ellipse(x, y, 20, 20);
}

function draw() {
	
}