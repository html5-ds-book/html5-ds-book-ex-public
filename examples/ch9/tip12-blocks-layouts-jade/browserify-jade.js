var jade = require('jade'),
    path = require('path');

module.exports = function(browserify) {    
    browserify.register('jade', function(tmpl, file) {
        console.log(file);
        var fn =  jade.compile(tmpl, {
            client: true,
            filename:true,
            path: path.dirname(file)
        });
        return ["var jade = require('jade/lib/runtime.js');",
                'module.exports=',fn.toString()].join('');
    });
};

