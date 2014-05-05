$(function() {
    function generateParams(params) {
        var result = new SOAPClientParameters();
        for (var key in params) result.add(key, params[key]);
        return result;
    }
    $("#search").on('submit', function(e) {
        e.preventDefault();
        var q = $('#q').val();
        var params = {keywords: q};
        SOAPClient.invoke(
            'https://svcs.ebay.com/services/search/FindingService/v1', 
            'findItemsByKeywords', 
            {}, 
            generateParams(params), 
            true, 
            function(res, resXML) {
                console.log(resXML);
            });
    }); 
});

