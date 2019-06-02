const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution = `&copy;<a href= attribution="http://www.openstreetmap.org/copyright"> OpenStreetMap</a>`
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
  attribution
});
tiles.addTo(mymap);


getData();

// pide datos al servidor y muestra los markers en el mapa
// 
async function getData() {
  const response = await fetch('/api') // podria ser otra ruta , pero como este es un metodo GET, la mantengo
  const data = await response.json();
  console.log(data);

  for (item of data) {
    const marker =L.marker([item.lat, item.lon]).addTo(mymap);
    const txt = `	el clima aqui ${item.lat} &deg,  ${item.lon}&deg 
			 y la temperatura es de ${item.temperature} & deg C, y tipo de cambio ${item.tipoDeCambio}`
    marker.bindPopup(txt); // vincula el texto a cada marker

    //    const root = document.createElement('div');
    //    const geo = document.createElement('div');
    //    const date = document.createElement('div');
    //    const img = document.createElement('img');

    //    geo.textContent = `geo: ${item.lat}, ${item.lon}`; // OJO es la otra comilla
    //    const dateString = new Date(item.timestamp).toLocaleString();
    //    date.textContent = dateString;
    //    //img.src = item.image64;
    //    // img.alt= "varias fotos de ejemplo";
    //    root.append(geo, date, img); // agrega los divs 
    //    document.body.append(root); // los pone en el body
  }
}