;(function($) {
    
    $.avalidate = {};
    $.avalidate.equals = function(name, callback) {
        var other = $(this).parents('form').find('[name="'+name+'"]').val();
        callback($(this).val() === other, {});
    };
    $.avalidate.minlen = function(len, callback) {
        callback($(this).val().length >= len || $(this).text().length >= len, {minlen: len});
    };
    $.avalidate.server = function(param, cb) {
        setTimeout(function() {
            var val = $(this).val();
            if (~param.indexOf('mail')) 
                cb('test@test.com' != val, {email: val });
            else 
                cb('username' != val, { username: val });
        }.bind(this), 500);
    };
    $.avalidate.strength = function(minimum, cb) {
        cb($(this).val().length > minimum, {strength: 'Low'});
    };

}(jQuery));

