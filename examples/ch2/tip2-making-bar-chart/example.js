$(function() {    
    var day = 24 * 60 * 60 * 1000;
    function getData(cb) {
        var now  = new Date();
        now = new Date(now.getYear(), now.getMonth(), now.getDate()).getTime();
        var products = [];
        for (var product = 1; product < 4; ++product) {
            var sales = { label: "Product " + product, data: [] };
            for (var k = 7; k > 0; --k) 
                sales.data.push([now - k*day, Math.round(Math.random()*10)]);
            products.push(sales);
        }
        cb({series:products});
    }

    getData(function(data) {
        $.plot("#chart", data.series, {
            series: {
                stack: true, lines: { show: false },
                bars: { show: true, barWidth: 0.8 * day, align:'center' }
            },
            xaxis: {mode: 'time'}, yaxis: {label: 'sales'}
        });
    });
});

