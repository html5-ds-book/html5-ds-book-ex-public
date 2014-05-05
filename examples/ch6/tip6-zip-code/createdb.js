var csv = require('csv');
var zips = {};
csv().from.path('zip_code_database.csv').on('record', function(zc) {
    // column 0 is zipcode; column 5 is state
    // column 12 is country, 13 is decomissioned (0/1)
    // filter non-decmissioned US zipcodes
    if (zc[12] == 'US' && !parseInt(zc[13])) {
        zips[zc[5]] = zips[zc[5]] || []; 
        zips[zc[5]].push(parseInt(zc[0].trim(), 10)); 
    }

}).on('end', function() {

    var zipCodeDB = [];

    function rangify(arr) {
        var ranges = [], first = 0, last = 0;
        for (var k = 0; k < arr.length; ++k) {
            var first = arr[k];
            while (arr[k] + 1 >= arr[k + 1] && k < arr.length - 1) ++k;
            var last = arr[k];
            ranges.push(first != last? [first, last]:first); 
            first = last = 0; 
            
        }
        return ranges;
    }

    var list = [];
    for (var state in zips) if (state != 'undefined')
        list.push({state: state, codes: rangify(zips[state])});
    list = list.sort(function(s1, s2) { 
        return s1.state < s2.state ? -1 
             : s1.state > s2.state ?  1
             :0;
    });

    console.log('window.zipCodeDB =', JSON.stringify(list));

});
