var commonwealth = [
"Australia",
"Algeria",
"The Bahamas",
"Bangladesh",
"Belize",
"Botswana",
"Brunei",
"Cameroon",
"Canada",
"Cyprus",
"Gambia",
"Ghana",
"Guyana",
"India",
"Jamaica",
"Kenya",
"Lesotho",
"Malawi",
"Malaysia",
"Mozambique",
"Madagascar",
"Namibia",
"New Zealand",
"Nigeria",
"Pakistan",
"Papua New Guinea",
"Rwanda",
"Sierra Leone",
"Solomon Islands",
"Somaliland",
"South Africa",
"South Sudan",
"Sudan",
"Sri Lanka",
"Swaziland",
"United Republic of Tanzania",
"Trinidad and Tobago",
"Yemen",
"Uganda",
"United Kingdom",
"Vanuatu",
"Zambia"
];

function random(number) {
  return Math.floor(Math.random()*number).toString(16)
}

function randomColor() {
  return "#"+random(255)+random(255)+random(255);
}

function getColorForCountry(name){
  if (commonwealth.indexOf(name)<0) {
    return "#bbb";
  } else {
    return randomColor();
  }
}


var margin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10
},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var projection = d3.geo.mercator()
    .scale(width)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var zoom = d3.behavior.zoom()
    .translate(projection.translate())
    .scale(projection.scale())
    .scaleExtent([height, 10 * height])
    .on("zoom", move);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);

var feature = svg.append("g")
            .selectAll(".feature");

svg.append("rect")
    .attr("class", "frame")
    .attr("width", width)
    .attr("height", height);


d3.json("js/world-data.json", function(data) {
  feature = feature
      .data(data.features)
    .enter().append("path")
      .attr("class", "feature")
      .attr("d", path)
      .style("fill", function(d){return getColorForCountry(d.properties.name)});
});

function move() {
  projection.translate(d3.event.translate).scale(d3.event.scale);
  feature.attr("d", path);
}

