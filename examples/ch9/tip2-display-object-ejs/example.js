$(function() {
    var template = new EJS({
        text: $('#template').html()
    });
    function changeName() {
        $('#greeting').html(template.render({
            name: $("#name").val(), 
            hour: new Date().getHours() 
        }));
    }
    $('#name').on('keypress keyup', changeName);
    changeName();
});

