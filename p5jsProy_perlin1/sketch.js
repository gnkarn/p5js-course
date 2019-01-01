// 13.3

//var y=[];
var y=0;
var inc=.02;

var xoff=0;
var yoff=0;
var start =0;

function setup() {
	createCanvas(400, 400);
	background(51);
	// for (var i=0;i<width;i++){
	// 	y[i]=0;
	// }
	
}

function draw() {
	noFill();
background(51); 
	stroke(255);
beginShape();
	xoff=start;
	for (var x=0;x<width;x++){
		y = (noise(xoff) * height);
		vertex(x,y);
		xoff +=inc;
	}
	start+=inc;
	endShape();
	
}