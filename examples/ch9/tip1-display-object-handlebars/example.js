$(function() {
    var template = Handlebars.compile($('#template').html());
    function changeName() {
        var hour = new Date().getHours();
        $('#greeting').html(template({
            name: $("#name").val(), 
            evening: hour > 18,
            morning: hour < 10,
            day: hour >= 10 && hour <= 18
        }));
    }
    $('#name').on('keypress keyup', changeName);
    changeName();
});

