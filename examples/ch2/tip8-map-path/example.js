var map = L.map('map').setView([52.513, -0.06], 14)

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'Copyright (C) OpenStreetMap.org',
    maxZoom:18
}).addTo(map);

var polyline = L.polyline([
    [52.519, -0.08],
    [52.513, -0.06],
    [52.52, -0.047]
]).addTo(map);


var polygon = L.polygon([
    [52.509, -0.08],
    [52.503, -0.06],
    [52.51, -0.047]
], {
    color:"#f5f",
    stroke: false,
    fillOpacity:0.5
}).addTo(map);


