;(function(){
  function getData(url, onSucess) {

    var request = new XMLHttpRequest();

    request.open("GET", url, true);
    request.onload = function() {
      if (request.status === 200) {
        console.log(request);
        onSucess(request.response);
      }
    };
    request.send(null);
  }

  setTimeout(
    function() {
      getData(
        'http://localhost:8080/hi',
        function(response){
          console.log('finished getting data');
          var div = document.getElementById('data');
          var data = JSON.parse(response);
          div.innerHTML = data[0].hello;
        })
    },
    3000);
}());
