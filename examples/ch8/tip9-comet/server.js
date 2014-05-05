var app = require('http').createServer(requestHandler),
    io = require('socket.io').listen(app),
    fs = require('fs')

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

console.log(io.settings)

app.listen(80);

function requestHandler (req, res) {
  fs.readFile('index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
    res.writeHead(200);
    res.end(data);
    });
}

io.sockets.on('connection', function (socket) {
  socket.emit('ping', {
    timeIs: new Date()
  });

  socket.on('pong', function (data) {
    setTimeout(function(){
    socket.emit('ping', {
      timeIs: new Date()
    });
    console.log(data);
    }, 15000);
  });
});
