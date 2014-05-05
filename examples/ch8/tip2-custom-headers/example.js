;(function(){
  function getData(url, onSucess) {

    var request = new XMLHttpRequest();

    request.open("GET", url, true);
    request.setRequestHeader("X-Myapp","super");
    request.setRequestHeader("X-Myapp","awesome");
    request.onload = function() {
      if (request.status === 200) {
        onSucess(request.response);
      }
    };
    request.send(null);
  }

  getData(
    'http://localhost:8080/hi',
    function(response){
      console.log('finished getting data');
      var data = JSON.parse(response);
      document.getElementById('data').innerHTML = data[0].hello;
      var headers = data[0].headers,
          headersList = "<ul>";
      for(var key in headers){
        headersList += '<li><b>' + key + '</b>: ' + headers[key] +'</li>';
      };
      headersList += "</ul>";
      document.getElementById('headers').innerHTML = headersList;
    });
}());
