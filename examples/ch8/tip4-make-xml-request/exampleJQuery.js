;(function(){
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/hi",
    dataType: "xml",
    success: function(xml) {
      $("root > human", xml).each(function(){
        var p = $("<p></p>");
        $(p).text($(this).text()).appendTo("#humans");
      });
    }
  });
}())
