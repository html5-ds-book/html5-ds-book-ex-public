(function(exports) {

    var cookie = {};

    cookie.set = function set(name, val, opt) {
        opt = opt || {};
        var encodedVal = encodeURIComponent(JSON.stringify(val)),
            expires = opt.expires  ? opt.expires.toUTCString()
                    : opt.duration ? new Date(Date.now() 
                                     + opt.duration * 1000).toUTCString()
                    : null;
            
        var cook = name +'=' + encodedVal + ';';
        if (expires) cook += 'expires=' + expires;
        if (opt.path) cook += 'path=' + opt.path;
        document.cookie = cook;
    };

    cookie.del = function(name) {
        document.cookie = name + '=deleted; expires=' 
            + new Date(Date.now() - 1).toUTCString();
    }
    cookie.get = function get(name) {
        var cookies = {};
        var all = document.cookie.split(';').forEach(function(cs) {
            var c = cs.split('=');
            if (c[1]) 
                cookies[c[0]] = JSON.parse(decodeURIComponent(c[1]));
        });
        if (name) 
            return cookies[name]            
        else
            return cookies
    };

    exports.cookie = cookie;
}(typeof(exports) !== 'undefined' ? exports : this));


