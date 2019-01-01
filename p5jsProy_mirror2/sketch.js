// creando video con elementos del dominio

var video;
var vscale = 16;
var slider;

var rows = 30;
var cols = 40;
var boxes = [];

function setup() {
	createCanvas(640, 480);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(cols, rows); // para normal 320 x 240
	slider = createSlider(0, 255, 127, 1);
	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < cols; x++) {
			var box = createCheckbox();
			box.style('display', 'inline');
			box.parent('mirror');
			boxes.push(box);
		}
		var linebreak = createSpan('<br/>'); // pasa a la linea siguiente
		linebreak.parent('mirror');
	}
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
			var b = video.pixels[index + 2];
			var bright = (r + g + b) / 3;
			var threshold = slider.value();
			if (bright < threshold) {
				boxes[index/4].checked(true);
				fill(0);
			} else {
				fill(255);
				boxes[index/4].checked(false);
			}


			//var w= map(bright,0,255,0,vscale);// para version con cuadraditos proporcionales

			// transformo en b&w
			// pixels[index] = bright;
			// pixels[index + 1] = bright;
			// pixels[index + 2] = bright;
			// pixels[index + 3] = 255;
			//fill(bright); // para b&w
			//stroke(255);
			//fill(r, g, b, 255);
			noStroke();
			rectMode(CENTER);
			//rect(x*vscale, y*vscale, w, w);// version con cuadraditos proporcionales a bright
			rect(x * vscale, y * vscale, vscale, vscale); //version normal
		}
	}
	updatePixels();
	//video.updatePixels(); // video pixels
}