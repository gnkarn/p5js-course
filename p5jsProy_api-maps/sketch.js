var url = "https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1/1024x512?access_token=pk.eyJ1IjoiZ25rYXJuIiwiYSI6ImNqcHNrNmowZDB6bHY0MW9hbzFtZzU5ZGEifQ.9Wzug-JGC_-Kl74TvpBG6g";
// /styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}|{auto}/{width}x{height}{@2x}
//https://www.mapbox.com/api-documentation/#retrieve-a-static-map-from-a-style

sismosCsv = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv"

var p = 3.141516;
var mapimg;
var lat = 0;
var long = 0;
var x = 45;
vary = 45;
var baLat = -34.603; //-90 a 90
var baLong = -58.381; //-180 a 180
var zoom =1;
var earthquakes;
//"time""latitude"longitude"depth"mag"magType"

function preload() {
	mapimg = loadImage(url);
	earthquakes = loadStrings(sismosCsv);
}

function setup() {
	createCanvas(1024, 512);

	translate(width / 2, height / 2);
	imageMode(CENTER);
	image(mapimg, 0, 0);

	var cx = mercx(0); // centro del canvas en coord mercator
	var cy = mercy(0); // centro del canvas en coord mercator

	for (var i = 0; i < earthquakes.length; i++) {
		var data = earthquakes[i].split(/,/); // usa regex
		//console.log(data[2]);
		x = mercx(Number(data[2])) - cx;
		y = mercy(Number(data[1])) - cy;
		var mag = Number(data[4]);
		fill(255, 0, 0);

		console.log(mag);

		if (x < -width / 2) {
			x += width;
		} else if (x > width / 2) {
			x -= width;
		}
		mag = pow(10,mag);
		mag = sqrt(mag);
		var maxmag = sqrt(1000000000)/2;
		var d = map(mag, 0, maxmag, 0, 180);

		fill(255, 0, 0);
		//ellipseMode(CENTER);
		noStroke();
		ellipse(x, y, d, d);
		
		x = mercx(baLong) - cx;//buenos aires
		y = mercy(baLat) - cy;
		fill(255, 255, 255);
		ellipse(x, y, 15, 15);
	}



	x = mercx(lat) - cx;
	y = mercy(long) - cy;


	fill(255, 0, 255);
	ellipseMode(CENTER);
	ellipse(x, y, 10, 10);
	stroke(255);
	line(x, -height / 2, x, height / 2); //coordenadas del centro terraqueo 
	line(-width / 2, y, width / 2, y);

	x = mercx(baLong) - cx; //coord de bsas
	y = mercy(baLat) - cy;



}
var a = (256 / p) * 2^zoom; //pow(2,zoom)
function mercx(_long) {
	var b = (radians(_long) + p);
	return a * b
}

function mercy(_lat) {
	var b = tan(p / 4 + radians(_lat) / 2);
	var c = a * (p - log(b));
	return c
}


function draw() {


}