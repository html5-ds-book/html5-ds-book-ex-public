;(function(){
  $.ajax({
    url: 'http://localhost:8080/hi',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
     $('#data').text(data[0].hello);
    },beforeSend: function (xhr) {
      xhr.setRequestHeader('accept-version', '~1');
    }
  });

  $.ajax({
    url: 'http://localhost:8080/hi',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
     $('#dataNew').text(data[0]['awesome-new-feature'].hello);
    },beforeSend: function (xhr) {
      xhr.setRequestHeader('accept-version', '~2');
    }
  });

}())
