$(function() {
    var template = jade.compile($('#template').html());
    $('#list').html(template({prop: 'properties' }));
});

