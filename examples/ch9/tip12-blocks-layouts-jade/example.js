$(function() {    
    var templates = {
        'layout':require('./layout.jade'),
        'example':require('./example.jade')
    };
    console.log(templates.layout.toString())
    $('body').on('click', 'a', function() {
        var template = templates[$(this).text().trim()];
        $("#content").html(template({}));
    });
    $("#content").html(templates.layout({}));
});

