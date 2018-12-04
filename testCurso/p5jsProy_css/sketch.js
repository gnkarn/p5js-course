var canvasLoc;
var textbox;
var slider;
var myparagraph;
var group2change;
var myCanvas;
var input1;

function setup() {
	//	createCanvas(windowWidth, windowHeight);
	frameRate(20);
	slider = createSlider(10, 66, 16);
	textbox = createInput('enter text');
	textbox.id('text_input');

	canvasLoc = createP('aca va a ir el canvas');
	canvasLoc.id('miCanvas');
	myCanvas = createCanvas(300, 300);
	background(0);

	textbox.input(updateText);
	slider.input(updateSize);
	createP("parrafo creado en js " + random(0, 10));
	input1 = select('#input1');

	myparagraph = select('#par_id1');
	myparagraph.style('background-color', '#ff0000');

	group2change = selectAll('.clase2');
	for (let index = 0; index < group2change.length; index++) {
		group2change[index].mouseOver(changeBackground);
		group2change[index].mouseOut(normalBackground);
	}
	myCanvas.parent('miCanvas');
}

function updateSize() {
	canvasLoc.style("font-size", slider.value() + "pt");
}

function updateText() {
	input1.html(textbox.value());

}

//Estas funciones a hora se aplicaran a todos los elementos que pertenecen a la clase que los llamo
//dado que fueron asignadas en setup a cada uno de los elementos en un array , y cada uno es un objeto
function changeBackground() {
	this.style('background-color', '#F0F');
}

function normalBackground() {
	this.style('background-color', '#FFFFFF');
}

function draw() {
	background(0, 0, 0, 50);
	ellipse(100, 100, random(10, 100), random(10, 100));

}