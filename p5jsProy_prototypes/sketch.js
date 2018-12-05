// prototypes , cadena 
// ver propiedades del objeto , funciones que puedo reusar 
// entre varios objetos se definen a nivel de prototype,
// ojo en es6 el tema cambia , ver clases

function Particle(x_, y_) {
	this.x = x_ ;
	this.y = y_;

}

Particle.prototype.show = function () {
	point(this.x,this.y);
}
Particle.prototype.change=function(){
	this.x=mouseX;
	this.y=mouseY;
}

function setup() {
	background(255, 255, 255);
	createCanvas(300, 300);
	background(255, 255, 255);
	particle1 = new Particle(100,100);
	particle2 = new Particle(200,200);
	stroke(0);
	
	
}

function draw() {
	particle1.change( );
	particle1.show();
}