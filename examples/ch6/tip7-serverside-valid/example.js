$(function() {
    function validate(name, callback) {
        // Simulate an async server call
        setTimeout(function() {
            callback(~['user', 'example'].indexOf(name) ?
                'Username is already in use' : null);
        },500);
    }
    function createDelayed(ms) {
        var t = null;
        return function(fn) {
            if (t) clearTimeout(t);
            t = setTimeout(fn, ms);
        };
    };
    var delayed = createDelayed(1500);

    var user = $('input[name="user"]'), 
        form = user.parents('form');
    user.on('keyup keypress', function() {
        delayed(validate.bind(null, $(this).val(), function callback(err) {
            var validationError = form.find('p[data-validation-error="user"]');
            console.log(validationError);
            if (err) validationError.text(err).show();
            else validationError.hide();
        }));
    });

});

