var inc = .02;//resolucion en x
var incy=.02;//resolucion en y
var xoff = 0;
var yoff = 0;
var start=0;

var time=0;
var timestep=.05;//cambio en el tiempo para cada frame(velocidad)

// si quiero hacer un desplazamiendo en x o y sumo un incremento
// fijo en x e y , y lo voy cambiando frame a frame
// es como mover todo el mantel tirando de algun punto
function setup() {
	createCanvas(400, 400);
	background(0);
}

function draw() {
	loadPixels();

	time+=timestep;
	for (var y = 0; y < height; y++) {
	for (var x = 0; x < width; x++) {
		 var index = (x+y*width)*4;	
var out = (noise((x) * inc, (y) * incy, time)) * 255;
		pixels[index]= 255;
		pixels[index+1] = 0;
		pixels[index+2] = 0;
		pixels[index+3] = out;	
		
	}
	start+=incy;
	updatePixels();// actualiza luego de cada fila 
}

}