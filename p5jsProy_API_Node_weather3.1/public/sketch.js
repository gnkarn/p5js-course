function setup() {

	// dark sky api
	// key = da0083f11ca5d694f940871e1f43e297
	// https://api.darksky.net/forecast/da0083f11ca5d694f940871e1f43e297/37.8267,-122.4233

	function geoFindMe() {
		try {
			async function success(position) {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				console.log(position);
				console.log(" success");
				const lat = position.coords.latitude;
				document.getElementById('latitude').textContent = lat.toFixed(2);
				const lon = position.coords.longitude;
				document.getElementById('longitude').textContent = lon.toFixed(2);


				video.loadPixels(); // trae los pixels al canvas
				//const image64 = video.canvas.toDataURL();

				// el servidor pide los datos a la web y luego la consulta es a mi server
				const api_url = `weather/${lat},${lon}` // OJO con las comillas  ahora recibo el dato desde MI servidor
				const response_node = await fetch(api_url);
				const json = await response_node.json();
				console.log(json);

				const summary = json.weather.currently.summary;
				console.log(summary);
				document.getElementById('summary').textContent = summary;

				const temperature = json.weather.currently.temperature;
				console.log(temperature);
				document.getElementById('temperature').textContent = temperature;

				const tipoDeCambio = json.gob.data['0']['1'];
				console.log(tipoDeCambio);
				document.getElementById('tipoDeCambio').textContent = tipoDeCambio;

				// solo para poner la fecha actual en el formato que necesita el api gob
				const data = {
					lat,
					lon,
					temperature,
					tipoDeCambio // no tiene goyete es solo para el ejemplo
					//		,image64
				};
				// full options https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

				const options = {
					headers: {
						'Content-Type': 'application/json',
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					method: 'POST',
					body: JSON.stringify(data), // body data type must match "Content-Type" header
				}
				const db_response = await fetch('/api', options);
				const db_json = await db_response.json(); // response vuelve como stream , lo convierto a json
				console.log(db_json);
			};


			function error() {
				status.textContent = 'Unable to retrieve your location';
				console.log("error");
			}

			if (!navigator.geolocation) {
				status.textContent = 'Geolocation is not supported by your browser';
				console.log(" location not supported in the browser");
			} else {
				status.textContent = 'Locating…';
				console.log("locating");
				navigator.geolocation.getCurrentPosition(success, error);
			}
		} catch (error) {
			console.error(error);
		}
	} //  fin geofindme

	// de esta forma solo agrega el evento si el elemento ya existe
	var el = document.getElementById('find-me');
	if (el) {
		el.addEventListener('click', geoFindMe, false);
	}

	// agregamos video
	noCanvas();
	const video = createCapture(VIDEO);
	video.size(320, 240);

}