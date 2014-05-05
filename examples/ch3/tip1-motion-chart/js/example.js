(function () {

  //create a color pallete
  var palette = new Rickshaw.Color.Palette({scheme: 'munin' });

  // we set the refresh rate in milisconds
  var refreshRate = 500;

  // create graph
  var graph = new Rickshaw.Graph({
      element: document.getElementById("chart"),
      width: 900,
      height: 600,
      renderer: 'line',
      series: new Rickshaw.Series.FixedDuration(
        [
          { name : 'one' },
          { name : 'two' },
          { name : 'three' }
        ], palette, {
          timeInterval: refreshRate,
          maxDataPoints: 50
        }
      )
  });

  //create the Y Axis
  var yAxis = new Rickshaw.Graph.Axis.Y({
    'graph': graph
  });

  // render once the first time
  graph.render();
  yAxis.render();

  //random util
  function getRandomInRange(n){
    return Math.floor(Math.random() * n);
  }

  // generate random data and add it to the graph
  setInterval(function() {
    var data = {
      'one' : getRandomInRange(50) + 100,
      'two' : Math.abs(Math.sin(getRandomInRange(30)+1) ) * (getRandomInRange(100) + 100),
      'three' : 400 + getRandomInRange(110) * 2
    };

    graph.series.addData(data);

    //update
    graph.render();
    yAxis.render();

  }, refreshRate);

}());


