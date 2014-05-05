(function($) {
  function fetchRandomQuote(location,data){
    $.ajax(
      {
      url:location,
      dataType:'json',
      error: function (request, status, error) {
        console.log(error);
        console.log(request.responseText);
      },
      success: function(result){
      //TODO use result.size
      var quoteNumber = Math.floor(Math.random()*26)+1;
      var obj = result.quotes[quoteNumber];
          for(var key in obj){
            data.title += key;
            data.body = obj[key];
        }
       simpleNotification.show(data);
    }}
    );
  };
  $(document).ready(function() {
    $("#show").click(function (){
      var data = {
        icon: "images/war.png",
        title: "The Art of War - The Use of Spies ",
        body: "text",
        timeout : 7000,
        errorCallback: function(){
          $("#fallback").text(this.body);
        }
      };
     fetchRandomQuote('js/data.json',data);
    });
  });
}(jQuery));
