(function($) {

    function eachOrOne(items, cb) {
        return (items instanceof Array ? items : [items]).map(cb);
    }

    function rotate(pt, a, c) {
        a = 0 - a;
        return { x: c.x + (pt.x - c.x) * Math.cos(a) - (pt.y-c.y) * Math.sin(a),
                 y: c.y + (pt.x - c.x) * Math.sin(a) + (pt.y-c.y) * Math.cos(a) };
    }
    function color(ctx, c) {
        return c;
    }

    $.gauge = function(target, options) {
        var defaults = {
            yoffset: 0.2,
            scale: { 
                type: 'linear',
                values: [1, 200], 
                angles: [0, Math.PI]
            },
            strip: {
                scale: 0, radius: 0.8, width: 0.05,
                color: "#aaa", from: 0, to: 200
            },           
            ticks: {
                scale: 0, radius: 0.77, length: 0.1, width: 1, color: "#555",
                values: {from: 0, to:200, step: 10},
            },           
            labels: {
                scale: 0, radius: 0.65,
                font: '12px Verdana', color: "#444",
                values: {from: 0, to:200, step: 20}
            },
            needle: {
                scale: 0, length: 0.8, thickness: 0.1,
                color: "#555", value: 67
            }
        };
       
        var options = $.extend(true, {}, defaults, options);
        for (var key in defaults) if (key != 'yoffset')
            options[key] = eachOrOne(options[key], function(item) {
                return $.extend(true, {}, defaults[key], item);
            });        
        var $target = $(target);
        var ctx = $target[0].getContext('2d');
        options.scale = eachOrOne(options.scale, function(s) {
            return $.gauge.scale(s);
        });
        
        eachOrOne(options.ticks, function(t) {
            return t.values = $.gauge.range(t.values);
        });
        eachOrOne(options.labels, function(l) {
            return l.values = $.gauge.range(l.values);
        });
        function draw(options) {
            var w = $target.width(), h = $target.height(),
                c = {x: w * 0.5, y: h * (0.5 + options.yoffset)},
                r = w * 0.5,
                pi = Math.PI;
            ctx.clearRect(0, 0, w, h);
            // strips
            eachOrOne(options.strip, function(s) {
                var scale = options.scale[s.scale || 0];
                ctx.beginPath();
                ctx.strokeStyle = color(ctx, s.color);
                ctx.lineWidth = r * s.width;
                ctx.arc(c.x, c.y, s.radius * r, scale(s.to), scale(s.from), true);
                ctx.stroke();
            });
            // ticks
            eachOrOne(options.ticks, function(s) {
                var scale = options.scale[s.scale || 0];
                ctx.strokeStyle = color(ctx, s.color);
                ctx.lineWidth = r * s.length;
                var delta = scale(s.width) - scale(0);
                s.values.forEach(function(v) {
                    ctx.beginPath();
                    ctx.arc(c.x, c.y, s.radius * r, 
                        scale(v) + delta, scale(v) - delta, true);
                    ctx.stroke();
                });
            });
            // labels
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'middle';
            eachOrOne(options.labels, function(s) {
                var scale = options.scale[s.scale || 0];
                ctx.font = s.font;
                ctx.fillStyle = color(ctx, s.color);
                s.values.forEach(function(v) {
                    var pos = rotate({x: c.x + r * s.radius, y:c.y}, 0 - scale(v), c);
                    ctx.beginPath();
                    ctx.fillText(v, pos.x, pos.y);
                    ctx.fill();
                });
            });
            // needle
            eachOrOne(options.needle, function(s) {
                var scale = options.scale[s.scale || 0];
                var rotrad = 0 - scale(s.value);
                var p1 = rotate({x: c.x + r * s.length, y: c.y},    rotrad, c),
                    p2 = rotate({x: c.x, y: c.y + r*s.thickness/2}, rotrad, c),
                    p3 = rotate({x: c.x, y: c.y - r*s.thickness/2}, rotrad, c);
                ctx.fillStyle = color(ctx, s.color);
                ctx.beginPath();
                ctx.arc(c.x, c.y, r * s.thickness / 2, 0, 2*Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.fill();
                
            });
            
        }
        
        draw(options);
        return function(val, i) {
            i = i || 0;
            options.needle[i].value = val;
            draw(options);
        }

    };
    $.gauge.range = function(opt) {
        if (opt instanceof Array) return opt;
        var arr = [], step = opt.step;
        var last = opt.from;
        for (var k = opt.from; k <= opt.to; k+= step) 
            arr.push(opt.log ? Math.pow(opt.log, k) : k);
        return arr;
    };
    $.gauge.scale = function(opt, f) {
        if (opt.type == 'linear') opt.type = function(x) { return x; };
        else if (opt.type == 'log') opt.type = Math.log;
        var f = opt.type,
            v0 = f(opt.values[0]),
            v1 = f(opt.values[1]);
        return function(v) {
            return (f(v) - v0) / (v1 - v0)
                    * (opt.angles[1] - opt.angles[0]) + Math.PI + opt.angles[0];
        };
    }

}(jQuery));


