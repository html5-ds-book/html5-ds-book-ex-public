var restify = require('restify');

function respond(req, res, next) {
  console.log("Got HTTP " + req.method + " on " + req.url + " responding");
  addHeaders(req,res);
  var hello = [{
    'id':'0',
    'hello': 'world'
  },{
    'id':'1',
    'say':'what'
  }];

  if(req.params.index){
    var found = hello[req.params.index];
    if(found){
      res.send(found);
    } else {
      res.status(404);
      res.send();
    }
  };
  res.send(hello);
  return next();
}

function addHeaders(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
};


var server = restify.createServer();

server.get('hi', respond);
server.get('hi/:index', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
