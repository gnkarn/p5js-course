// api geolocation , proyecto de joe lee
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API


const express = require('express');
const app = express(); // toda la app esta ahora contenida en una variable
app.listen(3000,()=> console.log('listening at port 3000'));
app.use(express.static('public')); // incorporado en un folder "public"
