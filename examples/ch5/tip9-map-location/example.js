$('body').on('click', '[data-input-map] > a', function(e) {
    
    e.preventDefault();

    var par = $(this).parent();

    // Read the current location of the input
    var location = par.find('[data-location]');
    var latlng = location.val().split(',').map(parseFloat);

    // Create the map element and center the map at the current 
    // location. Add a marker to that location.
    var mape = $('<div data-map />')
        .appendTo(par)[0];
    var map = L.map(mape).setView(latlng, 13)
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution:'Copyright (C) OpenStreetMap.org',
        maxZoom:18
    }).addTo(map);
    var marker = L.marker(latlng).addTo(map);


    // Update the location when a new place is clicked.
    map.on('click', function(e) {
        marker.setLatLng(e.latlng);
        location.val([e.latlng.lat, e.latlng.lng].join(','));
        setTimeout(function() { 
            $(mape).remove(); 
            inpe.remove(); 
        }, 500);
    });

    // Given a street adress return a list of locations with 
    // names and latlngs using the nominatim service.
    function findLocation(query, callback) {
        $.ajax('http://nominatim.openstreetmap.org/search', {
            data: { format: 'json', q: query }, 
            dataType: 'json'
        }).success(function(data) {
            callback(data.map(function(item) { 
                return { 
                    latlng: [item.lat, item.lon], 
                    name: item.display_name 
                }; 
            }));
        });
    }

    // Add a search box
    var inpe = $('<input type="text" data-search />')
        .appendTo(par);
    delaySearch = null;

    // Fire a search 1 second after the input stops changing,
    // displaying the results in a list  
    inpe.on('keydown keyup keypress', function() {
        if (delaySearch) clearTimeout(delaySearch);
        delaySearch = setTimeout(function() {
            par.find('div[data-results]').remove();
            var autocomplete = $('<div data-results />')
                .appendTo(par);
            findLocation(inpe.val(), function(results) {
                results.forEach(function(r) { 
                    $('<a href="#" />')
                        .attr('data-latlng', r.latlng.join(','))
                        .text(r.name).appendTo(autocomplete);
                });
                // When a result is picked, center the map there and
                // allow the user to pick the exact spot.
                autocomplete.on('click', 'a', function(e) {
                    e.preventDefault();
                    var latlng = $(this).attr('data-latlng')
                        .split(',');
                    map.setView(latlng, 13);
                    autocomplete.remove()
                });
            });
        }, 1000);
    });

});

