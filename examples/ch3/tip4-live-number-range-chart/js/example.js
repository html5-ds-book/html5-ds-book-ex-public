(function() {
  var refreshRate = 300;

  //create a color pallete
  var palette = new Rickshaw.Color.Palette( { scheme: 'munin' } );

  // create graph
  var graph = new Rickshaw.Graph({
    element: document.getElementById("chart"),
    width: 900,
    height: 500,
    renderer: 'area',
    series: new Rickshaw.Series.FixedDuration([{
        color: palette.color(),
        name: 'NASDAQ'
      }, {
        color: palette.color(),
        name: 'NIKKEI'
      }], palette, {
      timeInterval: refreshRate,
      maxDataPoints: 200,
      timeBase: new Date().getTime() / 1000
    })
  });

  // create the slider
  var slider = new Rickshaw.Graph.RangeSlider({
    graph: graph,
    element: $('#slider')
  });

  //create the Y Axis
  var yAxis = new Rickshaw.Graph.Axis.Y({
    graph: graph
  });

  //create a legend
  var legend = new Rickshaw.Graph.Legend({
      graph: graph,
      element: $('#legend').get(0)
  });

  // render once
  graph.render();


  // generate random data
  function getRandomInRange(n){
    return Math.floor(Math.random() * n);
  }

  setInterval( function() {

    var data = {
      one: getRandomInRange(50) + 100,
      two: 400 + getRandomInRange(110) * 2
    };

    graph.series.addData(data);

    //update
    graph.render();
    yAxis.render();

  }, refreshRate );

}());

