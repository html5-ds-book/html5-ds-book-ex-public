$(function() {
    var params = window.location.search.substring(1).split('&').
        map(function(param) { 
            var nameval = param.split('='); 
            return { name: nameval[0], value: nameval[1] }; 
        });
        console.log(params);
    var selectValues = params.
        filter(function(p) { return p.name == 'multi'; }).
        map(function(p) { return p.value; })
    $("#result").text("Selected: " + selectValues.join(','));

});

