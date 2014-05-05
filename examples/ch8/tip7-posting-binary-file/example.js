$(function() {
    var file;
    $("#file").on('change', function(e) {
        file = this.files[0]
    });
    $("#upload").on('click', function() {
        $("#info").text("Uploading...");
        $("#progress").css({width:0});
        if (!file) {
            $("#info").text('No file selected') 
            return; 
        }
        var upload =  postBinary('/upload/' + file.name, file);
        upload.progress(function(err, percent) {
            if (err) {
                $("#info").text(err);
                return;
            }
            console.log("Progress", percent);
            $("#progress").css({width: percent + '%'});
        });
        upload.done(function(err, res) {
            if (err) { 
                $("#info").text(err + ' ' + res); 
                return; 
            }
            $("#progress").css({width: '100%'});
            $("#info").text("Upload complete");
        });

    });
});

