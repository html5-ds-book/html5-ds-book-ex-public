var restify = require('restify');
var builder = require('xmlbuilder');
var doc = builder.create();

doc.begin('root')
  .ele('human')
    .att('type', 'female')
      .txt('some gal')
      .up()
  .ele('human')
    .att('type', 'male')
      .txt('some guy')
  .up()
  .ele('alien')
    .txt('complete');

console.log(doc.toString({ pretty: true }));


function respond(req, res, next) {
  res.setHeader('content-type', 'application/xml');
  res.send(doc.toString({ pretty: true }));
  return next();
}

function addHeaders(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
};


var server = restify.createServer({
  formatters: {
    //does not ser/deser it just passes string
    'application/xml': function formatXML(req, res, body) {
      if (body instanceof Error)
        return body.stack;

      if (Buffer.isBuffer(body))
        return body.toString('base64');

      return body;
    }
  }
});

server.get('hi', addHeaders, respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
