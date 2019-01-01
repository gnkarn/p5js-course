let t
let h;
let weather;
var api = "http://api.openweathermap.org/data/2.5/weather?q="
var urlUnits = "&units=metric"
var apiKey = "&APPID=c4e90f966334261a084ed705cc4a8008"
var url
var input;


function setup() {
	createCanvas(400, 400);

	button = select("#ingresa");
	button.mousePressed(ingresaCity);

	input = select("#ciudad");


}

function gotData(data) {

	weather = data;
	print(weather);

}

function ingresaCity() {

	url = api + input.value() + urlUnits + apiKey;
	print(input);
	print(url)
	loadJSON(url, gotData);
}

function draw() {
	background(0);
	if (weather) {
		t = weather.main.temp;
		h = weather.main.humidity;

		ellipse(100, 100, t, t);
		ellipse(150, 150, h, h);
	}
}