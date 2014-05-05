$(function() {    
    function getData(cb) {
        var now  = Date.now();
        var hour = 60 * 60 * 1000;
        var temperatures = [];
        // Generate random but convincing-looking data.
        for (var k = 24; k > 0; --k) 
            temperatures.push([now - k*hour, Math.random()*2 + 10*Math.pow((k-12)/12,2)]);
        cb({data:temperatures});
    }

    getData(function(series) {
        $.plot("#chart", [series], {xaxis: {mode: 'time'}});
    });
});

