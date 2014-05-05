$(function() {
    var map = L.map('map').setView([51.505, -0.09], 13)

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution:'Copyright (C) OpenStreetMap.org',
        maxZoom:18
    }).addTo(map);

    if ("geolocation" in navigator) {
        var marker = L.marker([51.5, -0.09]).addTo(map);
        navigator.geolocation.watchPosition(function(position) {
            var userLatLng = new L.LatLng(position.coords.latitude, position.coords.longitude);
            marker.setLatLng(userLatLng);
            map.panTo(userLatLng);
        }); 
    } 
    else alert("Sorry, geolocation is not supported in your browser");
});

