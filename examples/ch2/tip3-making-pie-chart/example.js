$(function() {    
    var day = 24 * 60 * 60 * 1000;
    function getData(cb) {
        var browsers = [
            {label: 'IE', data: 35.5, color:"#369"},
            {label: 'Firefox', data: 24.5, color: "#639"},
            {label: 'Chrome', data: 32.1, color: "#963"},
            {label: 'Other', data: 7.9, color: "#396"}
        ];
        cb(browsers);
    }

    getData(function(data) {
        $.plot("#chart", data, {
        series: {
            pie: { 
                show: true,
                radius: 0.9,
                label: {
                    show: true,
                    radius: 0.6,
                },
                tilt: 0.5
            }
        },
        legend: { show: false }
        });
    });
});

