(function() {
  var width = 1000,
          height = 600;

  var tree = d3.layout.tree()
          .size([height, width - 200]);

  var diagonal = d3.svg.diagonal()
          .projection(function(d) {
            return [d.y, d.x];
          });

  var vis = d3.select("#location").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(60, 0)");

  d3.json("tree.json", function(json) {
    var nodes = tree.nodes(json);

    vis.selectAll("path.link")
          .data(tree.links(nodes))
          .enter().append("path")
          .attr("class", "link")
          .attr("d", diagonal);

    var node = vis.selectAll("g.node")
            .data(nodes)
            .enter().append("g")
            .append("a")
            .attr("xlink:href", function(d) {
                 return d.url;
              })
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
              });

    node.append("circle")
            .attr("r", 20);

    node.append("text")
            .attr("dx", -22)
            .attr("fill", "white")
            .attr("dy", -22)
            .style("font-size", "22")
            .text(function(d) {
              return d.name;
            });
  });
}());
