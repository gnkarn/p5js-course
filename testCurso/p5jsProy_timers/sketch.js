var countInt = 0;
var countDraw = 0;
var mymic = [];
// no tienen resolucion 
// la frecuencia de muestreo del audio es sumamente lenta


function setup() {
	mic = new p5.AudioIn();
	mic.start();
	createCanvas(300, 300);

	background(0, 255);
	stroke(255, 0, 0, 200);
	frameRate(10);
	strokeWeight(10);
	timer1 = createP('timer 1');
	maketimer(timer1,8);

}

function maketimer(elt, wait) {
	
	setInterval(timeIt, wait);

	function timeIt() {
		countInt++;
		elt.html(countInt);
		mymic[countInt] = mic.getLevel();
	}
	//	 guardar 30 muestras para que luego draw las muestre de una

}

function draw() {
	background(0, 0, 0, 100);

	countDraw++;
	for (var x = 0; x < 30; x++) {
		if (x > mymic.length) {
			continue;
		}
		//line(x*10,0,x*10,mymic[x]*255*2);
		point(x * 10, mymic[x] * 255 * 4);
	}

	countInt = 0;
}