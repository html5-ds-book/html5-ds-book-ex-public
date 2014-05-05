(function(exports) {




    function type(x) {
        var t = typeof(x);
        if (t != "object") return t;
        else if (t instanceof Date) return 'date';
        else if (t instanceof Array) return 'array';
        else return t;
    }

    function keyvalmap(obj, fn) {
        var arr = [];
        for (var key in obj) arr.push(fn(key, obj));
        return arr;
    }

    var typeMap = {
        'number':'int',
        'boolean':'bool',
        'date': 'DateTime'
    }
    function constructorOf(o) {
        var t = (o.constructor.toString().match(/^function\s*(\w*)\(/i)[1]);
        t = t || 'Object';
        return t;
    }
    function typename(o) {
        var t = (o.constructor.toString().match(/^function\s*(\w*)\(/i)[1]);
        t = (t || 'object');
        return typeMap[t.toLowerCase()] ? typeMap[t.toLowerCase()] : t;
    }

    function serialize(p) {
        var param = "";
        switch (type(p)) {
            case "string": 
                return p.replace(/&/,'&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            case "number":
            case "boolean":
                return p.toString();
            case "date": 
                return p.toISOString();
            case "array":
                return p.map(function(el) {
                    var t = typename(el);
                    return '<'+t+'>' + serialize(el) + '</'+t+'>';
                }).join('');
            case "object":
                return keyvalmap(p, function(name, val) {
                    return '<'+name+'>' + serialize(val) + '</'+name+'>';
                }).join('');
              
        }
    }

    function createConstructor(name) {
        var f = eval('(' + function (props) {
            for (var key in props) if (props.hasOwnPropety(key))
                this[key] = props[key];
        }.toString().replace(/^function/, 'function ' + name) + ')');
        return f;
    }

    function createEnvelope(args) {

    }

    function createSoap(wsdl) {

        function getBinding(opName) {
            return $doc.find('binding[type="' + opName + '"]')
                .find('soap:binding').find('soap:operation')
                
            var b = [].slice.call(doc.getElementByTagName('binding')).filter(function(b) {
                return b.attributes['type'] == opName;
            })[0];
            var soapEndpoint = [].slice.call(b.children).filter(function(el) {
                return el.nodeName == 'soap:binding';
            })[0].
        }
        var self = {};
        var parser = new DOMParser()
        var $doc = $.parseXML(text);
        $doc.find('wsdl:portType').each(function() {

            var t = $(this).attr('name');
            var binding = $doc.find('wsdl:binding[name$="'+t+'"]').attr('name');
            var url = $doc.find('wsdl:port[name$="'+binding+'"] soap:address')
                .attr('location');

            var $(this).children('wsdl:operation').each(function(){
                self[$(this).attr('name')] = function(args, cb) {
                    $.post(url, createEnvelope(args), function(resp) {
                        cb(resp);
                    });
                };
            });

        });
    }

    var cache = {};
    var soap = function soap(url, cb) {
        if (cache[url]) cb(null, cache[url]);
        else $.get(url, function(wsdl) {
            cb(createSoap(wsdl))
        });
    };

    exports.soap = soap;
}(typeof(exports) !== 'undefined' ? exports : this));


