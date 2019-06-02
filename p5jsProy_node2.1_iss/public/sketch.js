
	function setup() {



		function geoFindMe() {

			async function success(position) {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				console.log(position);
				console.log(" success");
				const lat = position.coords.latitude;
				document.getElementById('latitude').textContent = lat;
				const lon = position.coords.longitude;
				document.getElementById('longitude').textContent = lon;
				video.loadPixels(); // trae los pixels al canvas
				const image64 = video.canvas.toDataURL();

				const data = {
					lat,
					lon,
					image64
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
				const response = await fetch('/api', options);
				const data_r = await response.json(); // response vuelve como stream , lo convierto a json
				console.log(data_r);
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
		}

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