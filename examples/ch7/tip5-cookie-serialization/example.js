$(function() {
    var savedform = cookie.get('formdata');
    savedform && savedform.forEach(function(nv) {
        $('form')
            .find('[name="'+nv.name+'"]')
            .val(nv.value);
    });
    $('form input').on('change keyup', function() {
        cookie.set('formdata', $('form').serializeArray(), 
                   {duration: 120});
    });
});
