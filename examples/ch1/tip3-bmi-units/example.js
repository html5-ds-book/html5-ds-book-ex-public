(function() {
  // Setup unitval
  $.unitval({
    weight: {
      "lbs": 0.453592, // kg
      "kg" : 1 // kg
    },
    height: {
      "ft"  : 0.3048, // m
      "inch": 0.0254, // m
      "m"   : 1, // m
      "cm"  : 0.01, // m
    },
    distance: {
      "km" : 1000, // m,
      "mi" : 1609.34 // m
    }
  });
  $("#unit").change(function() {
    var measurementUnits = $(this).val().split(';').map(function(u) {
      var type_unitround = u.split('='),
          unitround = type_unitround[1].split(' ');
        return {
          type: type_unitround[0],
          units: unitround[0].split(','),
          round: unitround[1]
        };
      });
      // Setup units for measurements.
    $('body').unitval(measurementUnits);
  });

  $("#unit").trigger("change");

  $('#height').on('keyup change',function() {
      var height = $('#height').unitval(),
          bmi = 22,
          idealWeight = bmi * height * height;
      $("#weight").unitval(idealWeight);
  });

}());
