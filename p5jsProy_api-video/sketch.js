var video;
var snapshots = [];
var w = 160;
var h = 120;
var button;
var counter = 0;

function setup() {
	createCanvas(800, 600);
	video = createCapture(VIDEO);
	video.size(w, h);
	//video.hide();
	button = createButton('picture');
	button.mousePressed(takeSnap);
	takeSnap();

}


function takeSnap() {
	//image(video, 0,0);
	//tint(random(255), 255, 100);
	snapshots[counter] = video.get();
	counter = (counter++);
	if (counter > 27) {
		counter = 0
	};
}

function draw() {
	background(50);
	var x = 0;
	var y = 0;
	takeSnap();
	counter++;
	if (snapshots.length) {
		for (var i = 0; i < snapshots.length; i++) {
			var index = (frameCount + i) % snapshots.length;
			image(snapshots[index], x, y, w, h);
			x = x + w;
			if (x > width) {
				x = 0;
				y = y + h;
			}
			if (y > height) {
				y = 0
			};
		}
	}

	//image(video, mouseX,mouseY);
	//if(snapshots.length){
	//image(snapshots[snapshots.length-1],0,0);
	//}
}