var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
  console.log('Client connected');
  socket.on('message', function (data) {
    console.log('Received message "%s"', data);
    io.sockets.emit('message', data);
  });
});

server.listen(process.env.PORT || 8080, function () {
  var addr = server.address();
  if ('IPv6' === addr.family) {
      addr.address = '[' + addr.address + ']';
  }
  console.log('Server listening on port http://%s:%s', addr.address, addr.port);
});
