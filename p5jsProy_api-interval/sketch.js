// http: //api.open-notify.org/iss-now.json
// {
// 	"message": "success",
// 	"timestamp": UNIX_TIME_STAMP,
// 	"iss_position": {
// 		"latitude": CURRENT_LATITUDE,
// 		"longitude": CURRENT_LONGITUDE
// 	}
// }

// hace el seguimiento de la estacion espacial , y 
// dibuja su posicion como un punto .

var url = "http://api.open-notify.org/iss-now.json";
var lineX = 0;
var issX = 0;
var issY = 0;
var flag = 0;

function setup() {
	createCanvas(300, 300);
	loadJSON(url, gotData, "jsonp");
	background(0);
	setInterval(askNewData, 2000);
}


function gotData(data) {
	print(data);
	issX = data.iss_position.latitude;
	issY = data.iss_position.longitude;
	issX = map(issX, -60, -20, 0, width);
	issY = map(issY, 100, 180, 0, height);
	flag = 1;
}

function askNewData() {
	if (flag) {
		loadJSON(url, gotData, "jsonp");
		flag = 0;
	}
}

function draw() {

	//background(51);
	stroke(255);
	//line(lineX, 0, lineX, height);
	lineX = (lineX + 5);
	if (lineX > width) {
		lineX = 0
	}
	stroke(255, 0, 0);
	ellipse(issX, issY, 10, 10);
}