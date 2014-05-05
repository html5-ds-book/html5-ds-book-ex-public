$(function() {

    function lookup(zipcode) {
        function within(zipcode, ranges) {
            for (var k = 0; k < ranges.length; ++k) 
                if (zipcode == ranges[k]
                   || (ranges[k].length > 1 
                       && ranges[k][0] <= zipcode 
                       && zipcode <= ranges[k][1])) return k;
            return -1;
        }
        for (var k = 0; k < window.zipCodeDB.length; ++k) {
            var state = window.zipCodeDB[k],
                check = within(zipcode, state.codes);
            if (~check) return state.state;
        };
        return null;
    }


    window.zipCodeDB.forEach(function(state) { 
        $('<option />').attr('value', state.state)
            .text(state.state).appendTo('#state');
    })


    $("#zipcode").on('keypress keyup change', function() {
        var state = lookup($(this).val());
        if (state == $("#state").val()) 
            $('#validate').text('Valid zipcode for ' + state);
        else $('#validate').text('Invalid zipcode');
    });

});

