var restify = require('restify');

function logReqRes(req, res, next){
  console.log("Got HTTP " + req.method + " on " + req.url + " with headers\n");
  console.log("Response headers\n", res.getHeaders());
  return next();
}

function helloV1(req, res, next) {
  var hello = [{
    'id':'0',
    'hello': 'grumpy old data',
    'headers': req.headers
  }];

  res.send(hello);
  return next();
}

function helloV2(req, res, next) {
  var hello = [{
    'id':'0',
    'awesome-new-feature':{
      'hello': 'awesomeness'
    },
    'headers': req.headers
  }];

  res.send(hello);
  return next();
}

function addHeaders(req, res, next) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, accept-version');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Expose-Headers', 'X-Requested-With, accept-version');

  return next();
};

var server = restify.createServer();

server.get({ path: "hi", version: '2.1.1'}, addHeaders, helloV2, logReqRes);
server.get({ path: "hi", version: '1.1.1'}, addHeaders, helloV1, logReqRes);

server.opts(/\.*/, addHeaders, logReqRes, function (req, res, next) {
  res.send(200);
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
