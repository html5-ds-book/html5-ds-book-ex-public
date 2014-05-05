$(function() {
    //javascript validation fallback
   $("#enable").click(function(){
      $("#userForm").validate({
        rules: {
          name : "required",
          comment: {
            required: true,
            minlength: 50
          }
        },
        messages: {
          name: "Please enter your name",
          comment: {
            required: "Please enter a comment",
            minlength: "Your comment must be at least 50 chars long"
          }
        },highlight: function(currentElement) {
           //on error
          console.log("error on " + currentElement );
        }, unhighlight: function(currentElement) {
           // validation error resolved
          console.log("no more error " +currentElement );
        }
      });
    });
 });
