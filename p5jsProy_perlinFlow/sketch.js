var inc = .1; //resolucion en x
var incy = .1; //resolucion en y
var xoff = 0;
var yoff = 0;
var start = 0;

var fr;

var time = 0;
var timestep = .01; //cambio en el tiempo para cada frame(velocidad), cuanto cambia el campo en el tiempo

var scl = 10; // para cuadricula el vector field
var rows, cols;

var particles = [];
var flowfield =[];

// si quiero hacer un desplazamiendo en x o y sumo un incremento
// fijo en x e y , y lo voy cambiando frame a frame
// es como mover todo el mantel tirando de algun punto
function setup() {
//colorMode(HSB);
displayDensity(1);
	//noFill();
	createCanvas(200, 200);
	background(11);
	cols = width / scl;
	rows = height / scl;
	fr = createP("frame rate: ");
	for (var i = 0; i < 200; i++) {
		particles[i] = new Particle();

	}

	//frameRate(15);
}

function draw() {
	//background(0,11); // eliminar si solo se quieren ver las particulas , poner un slider de alfa
	fr.html(floor(frameRate()));

	time += timestep;
	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < cols; x++) {
			var index = (x + y * cols);
			
			var angle = (noise((x) * inc, (y) * incy, time)) * TWO_PI*2;
			//fill(out);
			var v = p5.Vector.fromAngle(angle);
			v.setMag(1);// poner slider
			flowfield[index] = v;// guardo el estado del campo para cada particula
			//rect(x*scl, y*scl,scl,scl);
			stroke(66, 22);//poner slider en alfa
			strokeWeight(1);
			push();
			translate(x * scl, y * scl); // me muevo al cuadradito siguiente
			rotate(v.heading()); // roto los ejes en la direccion del vecto
			//line(0, 0, scl, 0); // traza una linea de campop de scl de largo en la direccion del nuevo eje x, agregar un stroke con slider de alfa 
			pop(); // vuelve las a las coordenadas normales
			
		}
		start += incy;

	}
for (var i = 0; i < particles.length; i++) {
	
	
	
	particles[i].follow(flowfield);
	particles[i].update();
	particles[i].edges();
	// stroke(frameCount % 255,5);
	stroke(255,0,0, 5);// poner slider en alfa
	particles[i].show();
}
}