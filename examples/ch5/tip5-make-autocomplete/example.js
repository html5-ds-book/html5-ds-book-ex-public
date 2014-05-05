$(function() {
  $(".marker").chosen();

  var occupation = ["programmer","manager","doctor","designer"];
  $("#occupation").autocomplete({
      source:occupation,
      minLength:2,
      delay:100
  });

  $("#language").autocomplete({
      source: function (request, response) {
        //matcher for terms filtering on client side
        var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          //simulate a serverside json api
          $.getJSON("countries.json?term=" + request.term, function (data) {
             response($.map(data, function (value, key) {
                for (var name in value) {
                  var result = {};
                  if (matcher.test( value[name])) {
                    result.label = value[name]+" "+name;
                    result.value = value[name];
                    return result;
                  }
                }
              })
            );
          });
      },
      minLength: 2,
      delay: 100
  });
});
