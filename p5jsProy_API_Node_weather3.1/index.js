// ESTE ES EL SERVIDOR NODE

// api geolocation , proyecto de joe lee
// este es el servidor NODE
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

// https://github.com/louischatriot/nedb

// ***********************************************************************
//end point gobierno , dato dolar : https://series-tiempo-ar-api.readthedocs.io/es/latest/quick-start/#consultar-o-integrar-json
// https: //apis.datos.gob.ar/series/api/series?
// ids=168.1_T_CAMBIOR_D_0_0_26,103.1_I2N_2016_M_15&format=json&metadata=none

// ver docs : https://series-tiempo-ar-api.readthedocs.io/es/latest/quick-start/#consultar-o-integrar-json
// https://apis.datos.gob.ar/series/api/series/?ids=168.1_T_CAMBIOR_D_0_0_26&start_date=2019-05-29&limit=1&&metadata=none
var today = new Date();
var dd = today.getDate(); // ojo 

var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
today = yyyy+'-' +mm + '-' + dd  ;

// ver los parametros de  la api : https://datosgobar.github.io/series-tiempo-ar-api/reference/api-reference/
const gob_api = `https://apis.datos.gob.ar/series/api/series/`
const gob_ids = `?ids=168.1_T_CAMBIOR_D_0_0_26`
//const gob_start_date= `&start_date=${today}&limit=1&metadata=none`
const gob_start_date = `&last=1&metadata=none`
const gob_url = gob_api + gob_ids + gob_start_date;
console.log(gob_url);

const express = require('express');

// Type 1: In-memory only datastore (no need to load the database)
var Datastore = require('nedb');
const fetch=require('node-fetch');
// *** env variables ver file .env
require('dotenv').config(); // carga lo que esta en el file dot.env en env.vars
//console.log(process.env);

const app = express(); // toda la app esta ahora contenida en una variable
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public')); // incorporado en un folder "public"
app.use(express.json({
  limit: '1mb'
})); // para que el servidor parsee el request como json

const database = new Datastore('database.db'); // crea la base neDb con ese nombre 
database.loadDatabase(); // carga una base , o la crea si no existe

//** */ database.insert({name:'GNK',status:' mi base'}); // solo para testing
// POST method route
// ver https://expressjs.com/es/guide/routing.html

app.post('/api', (request, response) => {
  console.log('i got a request'); // recibe el dato desde el cliente
  console.log(request.body.lat);
  console.log(request.body.lon);
  //** */response.end(); // minimum response expected

  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp; // lo agrego a mi objeto data

  database.insert(data); // agrega a la base
  //** */console.log(database);
  response.json(data); // envia la respuesta al cliente
  // ** res.send('POST request to the homepage');
});

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    // este find trae toda la base
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  })

})

// ** endpoint para datos de weather , recibidos desde el cliente
// con las coordenadas recibidas, busca datos de weather
// recibe lat , long y lo carga en latlon 
app.get('/weather/:latlon', async (request, response) => {
  const latlon= request.params.latlon.split(','); // toma el parametro latlon y lo separa en dos
  console.log('me piden el tiempo para estas coordenadas');
  console.log(latlon);
  
  const lat =latlon[0];
  const lon= latlon[1];
  // ojo con las comillas del URL son las de al lado del 1
  const api_key=process.env.API_KEY; // carga la clave desde .env
  const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}?units=si&lang=es`
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json(); // busca los datos de weather
  console.log(weather_data.currently.temperature);
  // response.json(weather_data); // recibe datos weather, y "responde al cliente"  este server actua como proxi y envia datos a los clientes
  
  const gob_api = gob_url;
  const fetch_response = await fetch(gob_api);
  const gob_data = await fetch_response.json(); // busca los datos de weather
  //console.log(gob_data.xxxx );

  // uno los datos de ambas fuentes y los envio al cliente
  const data={
    weather: weather_data,
    gob: gob_data
  }

  response.json(data); // recibe datos weather, y "responde al cliente"  este server actua como proxi y envia datos a los clientes
});

