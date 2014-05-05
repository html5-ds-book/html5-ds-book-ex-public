;(function(){
  var formData = new FormData();
  formData.append("text", "some strange data");
  $.ajax({
    url: "http://localhost:8080/hi",
    type: "POST",
    data: formData,
    processData: false,  // dont process data
    contentType: false   // don't set contentType
  });
}());
