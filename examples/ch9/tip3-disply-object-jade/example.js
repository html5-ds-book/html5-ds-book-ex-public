$(function() {
    var template = jade.compile(
        $('#template').html()
    );
    function changeName() {
        $('#greeting').html(template({
            name: $("#name").val(), 
            hour: new Date().getHours() 
        }));
    }
    $('#name').on('keypress keyup', changeName);
    changeName();
});

