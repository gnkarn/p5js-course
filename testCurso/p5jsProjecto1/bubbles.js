let bubble1;
let bubble2;


function setup() {
	createCanvas(600, 400);
	bubble1 = new Bubble(200,200,40,200);
	bubble2 = new Bubble(400,200,20,33);
	print(bubble1.x, bubble1.y);


}
class Bubble {
	constructor(_x,_y,_r,_color) {
		this.x = _x;
		this.y = _y;
		this.r = _r;
		this.color=_color;
	}
	move() {
		this.x = this.x + random(-5, 5);
		this.y = this.y + random(-5, 5);
	}

	show() {
		noStroke();
		strokeWeight(4);
		fill(this.color,20,30,255);
		ellipse(this.x, this.y, this.r, this.r);
	}
}

function draw() {
	background(0);
	bubble1.move();
	bubble1.show();
	bubble2.move();
	bubble2.show();
}