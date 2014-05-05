$(function() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        var json = {
            title: $(this).find('[name="title"]').val(),
            name: $(this).find('[name="name"]').val()
        };
        var data = JSON.stringify(json);
        $.ajax('http://localhost:8080/', {
            type: 'POST',
            data: data, 
            contentType:'application/json'
        }).success(function(response) {
            $("#greeting").text(response.greeting);
        }).fail(function() {
            $("#greeting").text(
                "Cannot connect to the server."
                + " Is the node script server.js running?")
        });
    });
});

