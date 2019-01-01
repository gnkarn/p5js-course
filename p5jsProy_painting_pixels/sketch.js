var video;
var vscale=16;

var particle = [];
var slider ;
function setup(){
createCanvas(640, 480);
pixelDensity(1);
video=createCapture(VIDEO);
video.size(width/vscale,height/vscale);
for (var i=0;i<200;i++){
particle[i] = new Particle(random(width	),random(height));
}
//background(52);

slider=createSlider(0, 255, 50, 1);
background(55, slider.value);
}

 
function draw(){
//background(1, slider.value);
	//video.loadPixels();
	noStroke();
	
	for (var par of particle){
		par.update();
	par.show();
	}
}