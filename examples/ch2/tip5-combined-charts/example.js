$(function() {    
    function getData(cb) {
        var altitudes = [], temperatures = [];
        // Generate random but convincing-looking data.
        for (var k = 0; k < 20; k += 0.5) {
            altitudes.push([k, Math.random()*50 + 1000*Math.pow((k-15)/15,2)]);
            temperatures.push([k, Math.random()*0.5 + k/4 + 15]);
        }
        cb({alt:altitudes, temp:temperatures});
    }

    getData(function(data) {
        $.plot("#chart", [
                {
                    data: data.alt, yaxis:1, 
                    lines: {fill:true, fillColor: { 
                        colors: ["#393", "#990", "#cc7", "#eee"] } }
                }, 
                {
                    data: data.temp, yaxis:2, color: "rgb(200, 20, 30)",
                    threshold: { below: 19, color: "rgb(20, 100, 200)" }
                }
            ], {
            xaxis: { 
                tickFormatter: function(km) { return km + ' km'; }
            },
            yaxes: [ { }, { position: "right"}],
            grid: { 
                markings: [{ xaxis: { from: 0, to: 8 }, color: "#eef" }]
            }
        });
    });
});

