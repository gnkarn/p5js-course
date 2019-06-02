
   getData();

 // pide datos al servidor
 async function getData() {
     const response = await fetch('/api') // podria ser otra ruta , pero como este es un metodo GET, la mantengo
     const data = await response.json();
     //console.log(data);

     for (item of data) {
       const root = document.createElement('div');
       const geo = document.createElement('div');
       const date = document.createElement('div');
       const img = document.createElement('img');

       // const mood = document.createElement('div');
       // mood.textContent = 'mood: ${item.mood}';
       geo.textContent = `geo: ${item.lat}, ${item.lon}`; // OJO es la otra comilla
       const dateString = new Date(item.timestamp).toLocaleString();
       date.textContent = dateString;
       img.src = item.image64;
        img.alt= "varias fotos de ejemplo";
       root.append(geo, date, img); // agrega los divs 
       document.body.append(root); // los pone en el body



     }
   }
