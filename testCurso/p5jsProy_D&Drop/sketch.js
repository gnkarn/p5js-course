// Este ejemplo no funciona por algun problema con p5js



//var dropzone;
function setup() {
	var canvas=createCanvas(300, 300);
//	background(120);

//	dropzone = select('canvas');
	// canvas.dragOver(highlight);
	// canvas.dragLeave(unhighlight);
	canvas.drop(gotfile);
}

function gotfile(file) {
	createP(file.name + " " + file.size + " " + file.type);
	var img1 = createImg(file.data);
		img1.size(50,50);
	// paso la imagen al canvas
	img1.hide();
	//image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
	image(img1, 0, 0,300,300,0,0,img1.width,img1.height);
}

// function highlight() {
// 	canvas.style('background-color', '#555');
// }

// function unhighlight() {
// 	canvas.style('background-color', '#fff');
// }

// function draw() {
// //	image(img, 0, 0, 200, 200);
// }