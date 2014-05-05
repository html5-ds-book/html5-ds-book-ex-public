$(function() {
    var attemptNumber = 1;
    //validation checks
    $("button[type=button]").click(function(){
      var message = (attemptNumber++)+"#<br/>";
      var isValid = $('form')[0].checkValidity();
      if(isValid){
        message += "Form is valid";
      }else{
        $("input").each(function( index ) {
          var validityState = $(this)[0].validity;
          var errors = "";
          if(!validityState.valid){
            message += "Invalid field <b> " + $(this).attr("name")+"</b>: ";
            for(key in validityState){
              if(validityState[key]){
                errors += key+" ";
              }
            }
            message += "  " + errors + " <br />";
          }
        });
      }
      message += "<hr />";
      $("#validLog").prepend(message);
    });

    //just reading the message
    console.log($("input[name='nickname']")[0].validationMessage);

    //override the standard message
    // $("input[name='nickname']")[0].setCustomValidity("You must have an awesome nickname");

    $("input[name='nickname']").change(function(){
       if($(this).val() === $("input[name='name']").val()){
        $(this)[0].setCustomValidity("You must have an awesome nickname so nickname and name should not be the same");
       }else{
        $(this)[0].setCustomValidity("");
       }
    });
    $("input[name='name']").change(function(){
       if($(this).val() === $("input[name='nickname']").val()){
        $(this)[0].setCustomValidity("Nickname and name should not match");
       }else{
        $(this)[0].setCustomValidity("");
       }
    });
    //override standard popup
    // $('form').each(function(){
    //   console.log("form");
    //   $(this)[0].addEventListener('invalid', function(e) {
    //     e.preventDefault();
    //     console.log("custom popup");
    //   },true);
    // });
});
