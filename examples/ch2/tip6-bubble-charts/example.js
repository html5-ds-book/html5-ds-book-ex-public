(function() {
var getData = function(cb) {
    cb({children:[
        {domain: 'google.com', value: 6413},
        {domain: 'yahoo.com', value: 831},
        {domain: 'bing.com', value: 1855},
        {domain: 'news.ycombinator.com', value: 5341},
        {domain: 'reddit.com', value: 511},
        {domain: 'blog.someone.com', value: 131},
        {domain: 'blog.another.com', value: 23},
        {domain: 'slashdot.org', value: 288},
        {domain: 'twitter.com', value: 327},
        {domain: 'review-website.com', value: 231}
    ]});
}

var r = 640,
    fill = d3.scale.category20c();

var vis = d3.select("#chart").append("svg")
    .attr("width", r)
    .attr("height", r)
    .attr("class", "bubble");


var bubble = window.bubble = d3.layout.pack()
    .sort(null)
    .size([r, r])
    .padding(1.5);

    getData(function(json) {
        var data = bubble.nodes(json);
        var selection = vis.selectAll("g.node")
            .data(data.filter(function(d) { return !d.children; }));
        var node = selection.enter().append("g");
        
        node.attr("class", "node");

        node.append("title")
            .text(function(d) { return d.domain });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        node.append("circle")
            .attr("r", function(d) { return d.r; })
            .style("fill", function(d) { return fill(d.domain); });

        node.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".3em")
            .text(function(d) { return d.domain.substring(0, d.r / 3); });
    });
}());

