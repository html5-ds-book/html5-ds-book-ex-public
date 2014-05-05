var restify = require('restify');

function respond(req, res, next) {
  console.log("Got HTTP " + req.method + " on " + req.url + " responding");
  var hello = [{
    'id':'0',
    'what': 'hi there stranger'
  }];

  res.send(hello);
  return next();
}

var server = restify.createServer();

server.use(restify.jsonp());
server.get('hi', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
