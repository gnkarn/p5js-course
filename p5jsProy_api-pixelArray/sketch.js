function setup() {
	createCanvas(300, 300);
	pixelDensity(1);
	loadPixels();
}

function draw() {
	background(11);
	randomSeed(frameCount);
	angleMode(DEGREES);
	
	for (var y = 1; y < height; y++) {
		for (var x = 1; x < width; x++) {
			var pixel = x + y * width;
			var index = pixel * 4;
			// pixels[index] = 255*sin(x/y*360); //R
			// pixels[index + 1] = 255*sin(y)*cos(x); //G
			// pixels[index + 2] = x^2; //B
			// pixels[index + 3] = 255; //A

				pixels[index] = 255 * sin(frameCount+x / y * 360); //R
				pixels[index + 1] = 255 * sin(y+frameCount) * cos(x+frameCount); //G
				pixels[index + 2] = 255*sin(frameCount*2); //B
				pixels[index + 3] = 255; //A
		}
	}
updatePixels();
	
}

