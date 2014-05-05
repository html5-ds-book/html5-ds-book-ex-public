$(function() {    
    var now  = Date.now();
    var hour = 60 * 60 * 1000, day = 24*hour;
    var weekAgo = now - 7*day;
    var zoomOut = null;

    function getData(cb) {
        var temperatures = [];
        // Generate random but convincing-looking data.
        for (var k = 24 * 7; k >= 0; --k) 
            temperatures.push([now - k*hour, 
                Math.random()*2 + 10*Math.sin(k/4 + 2)]);
        cb(temperatures);
    }

    getData(function(data) {
        var p = $.plot("#chart", [{data: data}], {
            xaxis: {
                mode: 'time',
                zoomRange: [day / 2, 7 * day], 
                panRange: [weekAgo, now]
            },
            yaxis: { zoomRange: false,   panRange: false },
            zoom: { interactive: true }, pan:  { interactive: true }
        });
        zoomOut = p.zoomOut.bind(p);
    });
    $('<input type="button" value="zoom out">').appendTo("#chart")
        .click(function (e) {
            e.preventDefault();
            zoomOut && zoomOut();
        });
});

