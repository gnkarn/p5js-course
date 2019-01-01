var video;
var vscale = 10;

function setup() {
	pixelDensity(1);
	createCanvas(320, 240);
	video = createCapture(VIDEO);
	video.size(32, 24); // para normal 320 x 240
	
	 
}

function draw() {
	background(55);
	video.loadPixels(); // video pixels
	//loadPixels(); // to canvas pixels
	for (var y = 0; y < video.height; y++) {
		for (var x = 0; x < video.width; x++) {
			var index = (y * video.width + x) * 4;
			var r = video.pixels[index];
			var g = video.pixels[index + 1];
			var b = video.pixels[index+2] ;
			var bright = (r + g + b) / 3;

			//var w= map(bright,0,255,0,vscale);// para version con cuadraditos proporcionales
			
			// transformo en b&w
			// pixels[index] = bright;
			// pixels[index + 1] = bright;
			// pixels[index + 2] = bright;
			// pixels[index + 3] = 255;
			//fill(bright); // para b&w
			//stroke(255);
			fill(r, g, b, 255);
			noStroke();
			//rect(x*vscale, y*vscale, w, w);// version con cuadraditos proporcionales a bright
			rect(x * vscale, y * vscale, vscale, vscale);//version normal
		}
	}
	//updatePixels();
	video.updatePixels(); // video pixels
}