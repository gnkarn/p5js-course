let max=32;
let inf=64;
let zoom_min = 1;
let zoom_max = 1;

let cr=0;
let ci=0;
let ca=0;
let cb=0;

function setup() {
	createCanvas(360, 360);
	pixelDensity(1);
	zoom_min = createSlider(-.01, 2.5, 1, .01);
	zoom_max = createSlider(.01, 2.5, 1, .01);
		cr = createSlider(-1, 1, -0.70176, .0001);
		ci = createSlider(-1, 1, -.3842, .0001);
//colorMode(HSB);
}

function draw() {
	loadPixels();
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {

			let a = map(x, 0, width, -zoom_min.value(), zoom_max.value());
			let b = map(y, 0, height, -zoom_min.value(), zoom_max.value());

			let n = 0;
			let z = 0;
			 ca= cr.value(); // para julia set con slider
			 cb = ci.value();

			//  ca=map(mouseX,0,width,-1,1); // julia set con mouse
			//  cb=map(mouseY,0,height,-1,1);

			//  ca = a; // para mandelbrot
			//  cb = b;

			while (n < max) {
				// calcula f=z^2+c ;z=a+bi
				let aa = a * a - b * b;
				let bb = 2 * a * b;
				a = aa + ca;
				b = bb + cb;
				// tiende a infinito ?
				if (abs(a + b) > inf) {
					break;
				}
				n++;
			}
			//bright=0;
			var bright = map(n, 0, max, 0, 1);
			bright=sqrt(bright)*255;
			if(n==max){
				bright =0;
			}
			
			let pix = (x + y * width) * 4;
			pixels[pix + 0] = red(bright);
			pixels[pix + 1] = green(bright);
			pixels[pix + 2] = blue(bright);
			pixels[pix + 3] = alpha(bright);
			
		}
		
	}
	cr.value(ca-.004);
	updatePixels();
}