(function () {
  var width = 960,
      height = 600;

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  var force = d3.layout.force()
      .gravity(.04)
      .distance(350)
      .charge(-200)
      .size([width, height]);

  d3.json("data.json", function(json) {
    force.nodes(json.nodes)
        .links(json.links)
        .start();

    var link = svg.selectAll(".link")
        .data(json.links)
      .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(json.nodes)
      .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("image")
        .attr("xlink:href", function(d){return d.icon;})
        .attr("x", -32)
        .attr("y", -32)
        .attr("width", 100)
        .attr("height", 100);

    node.append("text")
        .attr("dx", -32)
        .attr("dy", -32)
        .text(function(d) { return d.name });

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
  });
}());

