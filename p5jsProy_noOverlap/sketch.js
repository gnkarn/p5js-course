//no overlap

var circles = [];
var r = 48;


function setup() {
	createCanvas(640, 600);
	ellipseMode(CENTER);
	var counter =0;
	var protection= 20000;
	//espera a que tenga 30 elementos el vector
	while (circles.length <1000)
	{
		if (counter>protection){
			print(counter, circles.length );
			break};
		counter++;
		print(circles.length);

		var circle = {
			x: random(width),
			y: random(height),
			r: random(8,96),
		}
		//circles.push(circle);
		var overlapping = false;

		for (var j = 0; j < circles.length ; j++) {

			var other = circles[j];
			var d = dist(circle.x, circle.y, other.x, other.y);


			if (d < (circle.r + other.r)/2) {
				//overlapping
				overlapping = true;
				break;

			}
		}


		//var v = createVector(circle.x, circle.y);



		if (!overlapping) {
			circles.push(circle);
			
		}
	}

	for (var i = 0; i < circles.length; i++) {
		fill(255, 0, 156, 150);
		noStroke();
		ellipse(circles[i].x, circles[i].y, circles[i].r);
	}

}



function draw() {

}