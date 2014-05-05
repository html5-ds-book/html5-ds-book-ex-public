var express = require('express'),
    http    = require('http'),
    chat    = require('./chat.js'),
    shoe    = require('shoe'),
    dnode   = require('dnode')
// Create an express app
var app = express();
// that serves the static files in this directory
app.use('/', express.static(__dirname));
// then create a web server with this app
var server = http.createServer(app);
// Create a chat room instance,
var room = chat();
// then create a websocket stream that
// provides the chat room API via dnode
// and install that stream on the http server
// at the address /chat
shoe(function (stream) {
    var d = dnode(room);
    d.pipe(stream).pipe(d);
}).install(server, '/chat');
// start the server
server.listen(8080);

