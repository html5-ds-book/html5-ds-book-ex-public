var cool = (function(){
  var module = {};

  module.run = function(data){
    document.getElementById('data').innerHTML = data[0].what;
  }

  module.addElement = function (){
    var script = document.createElement('script');
    script.src = 'http://localhost:8080/hi?callback=cool.run'
    document.getElementById('data').appendChild(script);
    return true;
  }

  return module;
}());

cool.addElement();
