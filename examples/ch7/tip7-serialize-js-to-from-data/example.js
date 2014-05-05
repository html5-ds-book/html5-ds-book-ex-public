$(function() {

  $("#theForm").keyup(function(){
    var theForm = $("#theForm"),
        parameterArray = theForm.serializeArray();
    $("#generated").text(theForm.serialize());
    $("#generatedJson").text(JSON.stringify(parameterArray));
   });

});
