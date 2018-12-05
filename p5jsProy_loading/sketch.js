var angle = 0;
var song = [];
var loading = true;
var counter = 0;
var totalSongs = 2;

function soundError(err) {
	console.log(err);
}

function soundLoading() {
	laoding = true;
	print(".");
}

function songsLoad(file) {
	loadSound(file, soundLoaded, soundError, soundLoading);

	function soundLoaded(sound) {
		song.push(sound);
		console.log(file);
		console.log(floor(millis()) + "ms");
		song[counter].play();
		counter++;
		if (counter == totalSongs) {
			loading = false;
		}
	}

}



function setup() {
	createCanvas(300, 300);
	console.log(floor(millis()) + "ms");
	for (var i = 0; i < totalSongs; i++) {
		songsLoad('./sound/song' + (i + 1) + '.mp3');
		print("song" + (i + 1));
	}


}

function draw() {

	if (loading) {
		background(51);
		stroke(255);
		noFill();
		rect(10, 10, 200, 20);
		noStroke();
		fill(0, 120, 0, 100);
		var w = counter / (totalSongs - 1) * 200;

		rect(10, 10, w, 20);
		stroke(255);

		translate(width / 2, height / 2);
		rotate(angle);
		strokeWeight(4);
		line(0, 0, 0, 50);
		angle += .1;
	}
}