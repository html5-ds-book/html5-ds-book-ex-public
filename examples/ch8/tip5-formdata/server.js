var restify = require('restify');

function doPost(req, res, next) {
  console.log("Got HTTP " + req.method + " on " + req.url + " responding");
  console.log(req.body);
  res.send(200);
  return next();
}

function addHeaders(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
};


var server = restify.createServer();

server.use(restify.bodyParser({ mapParams: false }));
server.post('hi', addHeaders, doPost);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
