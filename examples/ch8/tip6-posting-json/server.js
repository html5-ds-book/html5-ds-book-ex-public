require('http').createServer(function(req, res) {
    var data = [];
    req.on('data', function(d) {
        data.push(d.toString());
    });
    req.on('end', function() {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        if (!data.length) return res.end();
        res.setHeader('Content-Type', 'application/json');
        var json = JSON.parse(data.join(''));
        res.end(JSON.stringify({
            greeting: 'Hello ' + json.title + ' ' + json.name
        }));
    });
}).listen(8080);

