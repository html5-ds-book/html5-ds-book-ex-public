$(function() {    
    function getData(cb) {
        var now  = Date.now();
        var hour = 60 * 60 * 1000;
        var altitudes = [];
        // Generate random but convincing-looking data.
        for (var k = 0; k < 20; k += 0.5) 
            altitudes.push([k, Math.random()*50 + 1000*Math.pow((k-15)/15,2)]);
        cb(altitudes);
    }

    getData(function(data) {
        $.plot("#chart", [{data: data}], {
            xaxis: { 
                tickFormatter: function(km) { return km + ' km'; }
            }, 
            lines: { 
                fill: true, 
                fillColor: {colors: ["#393", "#990", "#cc7", "#eee"] } 
            },
            grid: { 
                markings: [{ xaxis: { from: 0, to: 8 }, color: "#eef" }]
            }
        });
    });
});

