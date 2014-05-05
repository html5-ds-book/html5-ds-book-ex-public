$.ajax({
    type : "GET",
    dataType : "jsonp",
    url : 'http://localhost:8080/hi',
    success: function(obj){
      $('#oneMoreTime').text(obj[0].what);
    }
});
