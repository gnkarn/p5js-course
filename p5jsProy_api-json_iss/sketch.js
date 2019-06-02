// usando una API  1.6
// https://api.wheretheiss.at/v1/satellites/25544

// https://github.com/CodingTrain/Intro-to-Data-APIs-JS/tree/source/module1


// {
// 	"name": "iss",
// 	"id": 25544,
// 	"latitude": 26.963016098317,
// 	"longitude": 64.620869640678,
// 	"altitude": 411.51551864335,
// 	"velocity": 27610.040231926,
// 	"visibility": "daylight",
// 	"footprint": 4464.0438549576,
// 	"timestamp": 1558957971,
// 	"daynum": 2458630.9950347,
// 	"solar_lat": 21.293223693555,
// 	"solar_lon": 1.0755202457806,
// 	"units": "kilometers"
// }

// making map and tile 
const mymap = L.map('issMap').setView([0, 0], 1);
let issImg = 'iss2.png';

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, {
	attribution
});
tiles.addTo(mymap);

// definir el icon
var issIcon = L.icon({
	iconUrl: issImg,
	iconSize: [50, 32],
	iconAnchor: [25, 16],
	popupAnchor: [-3, -76],
	//	shadowUrl: 'ISS.png',
	shadowSize: [68, 95],
	shadowAnchor: [22, 94]
});


var marker = L.marker([0, 0], {
	icon: issIcon
}).addTo(mymap);

mymap.on('zoomend', function () {
	const zoom = mymap.getZoom() + 1;
	const w = 50 * zoom;
	const h = 32 * zoom;
	issIcon.options.iconSize = [w, h];
	issIcon.options.iconAnchor = [w / 2, h / 2];
	mymap.removeLayer(marker);
	let latlng = marker.getLatLng();
	marker = L.marker([0, 0], {
		icon: issIcon
	}).addTo(mymap);
	marker.setLatLng(latlng);
});

const url = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true; // para centrar el mapa solo al inicio
let canvas;


let pos;
let history = [];


async function getISS() {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
	const {
		latitude,
		longitude,
		altitude
	} = data;
	console.log(latitude);
	marker.setLatLng([latitude, longitude, altitude]);
	if (firstTime) {
		mymap.setView([latitude, longitude], 2); // location of map itself : para que siga a la estacion centrada
		firstTime = false;
	}
	document.getElementById('lat').textContent = latitude.toFixed(4);
	document.getElementById('long').textContent = longitude.toFixed(4);
	document.getElementById('alt').textContent = altitude.toFixed(4);
}

//getISS();
setInterval(() => {
	getISS();
}, 2000);