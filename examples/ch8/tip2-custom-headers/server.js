var restify = require('restify');

function respond(req, res, next) {
  console.log("Got HTTP " + req.method + " on " + req.url + " with headers\n");
  console.log("Request: ", req.headers);
  var hello = [{
    'id':'0',
    'hello': 'world',
    'headers': req.headers
  }];

  res.send(hello);
  console.log('Response:\n ', res.headers());
  return next();
}

function addHeaders(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-Myapp');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Expose-Headers', 'X-Myapp, X-Requested-With');
  return next();
};


var server = restify.createServer();

server.get('hi', addHeaders, respond);
server.opts(/\.*/, addHeaders, function (req, res, next) {
  console.log("Got HTTP " + req.method + " on " + req.url + " with headers\n");
  res.send(200);
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
