// node server
// para arancar el server en terminal tipear
// node server.js

console.log(" mi socket server funcionando");
var express = require('express');
var app = express();

var server = app.listen(3000);
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server); // crea un socket en el server
io.sockets.on('connection',newconnection);

function newconnection(socket){
  console.log('new connection:' + socket.id);
  console.log(socket.id);

  socket.on('mouse',mouseMsg) ;

}

function mouseMsg(data){
 console.log(data);// en la consola del servidor node
 //socket.broadcast.write('mouse',data);// no incluye al cliente emisor
io.sockets.emit('mouse',data);// inluye al emisor
}