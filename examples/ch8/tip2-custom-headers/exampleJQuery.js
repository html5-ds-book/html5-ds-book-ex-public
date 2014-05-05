;(function(){
  $.ajax({
    url: 'http://localhost:8080/hi',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
     $('#dataRecieved').text(data[0].headers['x-myapp']);
    },
    error: function () {
      console.log('Oh noooo');
    },
    beforeSend: function (xhr) {
      xhr.setRequestHeader('x-myapp', 'this was easy');
    }
  });
}())
