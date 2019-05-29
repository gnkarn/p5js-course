// api geolocation , proyecto de joe lee
// este es el servidor NODE
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

// https://github.com/louischatriot/nedb

const express = require('express');

// Type 1: In-memory only datastore (no need to load the database)
var Datastore = require('nedb');



const app = express(); // toda la app esta ahora contenida en una variable
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public')); // incorporado en un folder "public"
app.use(express.json({
  limit: '1mb'
})); // para que el servidor parsee el request como json

const database = new Datastore('database.db'); // crea la base neDb con ese nombre 
database.loadDatabase(); // carga una base , o la crea si no existe
// database.insert({name:'GNK',status:' mi base'}); // solo para testing
// POST method route
// ver https://expressjs.com/es/guide/routing.html
app.post('/api', (request, response) => {
  console.log('i got a request'); // recibe el dato desde el cliente
  console.log(request.body.lat);
  console.log(request.body.lon);
  //response.end(); // minimum response expected

  const data = request.body;
  // database.push(data);// agrega al array
  const timestamp = Date.now();
  data.timestamp = timestamp; // lo agrego a mi objeto data

  database.insert(data); // agrega a la base
  //console.log(database);
  response.json(data); // envia la respuesta al cliente
  // res.send('POST request to the homepage');
});

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
     // este find trae toda la base
     if(err){
       response.end();
       return;
     }
    response.json(data);
  })

})