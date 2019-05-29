// usando una API
// https://api.wheretheiss.at/v1/satellites/25544

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


const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, {
	attribution
});
tiles.addTo(mymap);

// definir el icon
var myIcon = L.icon({
	iconUrl: 'iss2.png',
	iconSize: [50,32],
	iconAnchor: [25,16],
	popupAnchor: [-3, -76],
//	shadowUrl: 'ISS.png',
	shadowSize: [68, 95],
	shadowAnchor: [22, 94]
});


var marker = L.marker([0, 0], {
	icon: myIcon
}).addTo(mymap);

const url = "https://api.wheretheiss.at/v1/satellites/25544";


async function getISS() {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
	const {
		latitude,
		longitude
	} = data;
	console.log(latitude);
	marker.setLatLng([latitude, longitude]);
	document.getElementById('lat').textContent = latitude;
	document.getElementById('long').textContent = longitude;
}

getISS();