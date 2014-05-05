var path = require('path'),
    connect = require('connect'),
    fs = require('fs');

connect()
    .use('/upload', function(req, res) {        
        var file = fs.createWriteStream(
            path.join(__dirname, 'uploads', req.url))
        req.pipe(file);
        req.on('end', function() { 
            res.end("ok"); 
        });
    })
    .use(connect.static(__dirname))
    .listen(8080);

