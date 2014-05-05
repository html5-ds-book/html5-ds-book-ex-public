var restify = require('restify');
var fs = require('fs');

// create option for the https server instance
var httpsOptions = {
  key: fs.readFileSync('privatekey.pem'),
  certificate: fs.readFileSync('publiccert.pem')
};

// create the server object
var server = restify.createServer();
var httpsServer = restify.createServer(httpsOptions);

var serverCreate = function(app) {
  function doHi(req, res, next) {
    var name = 'nobody';
    if(req.params.name){
      name = req.params.name;
    }
    res.send('Hi ' + name);
    return next();
  }

  app.get('/hi/', doHi);
  app.get('/hi/:name', doHi);
}

// create instance of each server
serverCreate(server);
serverCreate(httpsServer);

// start our servers
server.listen(80, function() {
  console.log('started at %s', server.url);
});

httpsServer.listen(443, function() {
  console.log('started at %s', httpsServer.url);
});
