$(function() {
    var editCommand = function(cmd, arg) { 
        return document.execCommand(cmd, true, arg); 
    };
    $(".image").on('change', function(e) {
        for (var k = 0; k < this.files.length; ++k) {
            var f = this.files[k];
            var fr = new FileReader();
            if (f.type && f.type.match('image/.+')) 
                fr.readAsDataURL(f);
            else
                fr.readAsText(f);
            (function(f) {
                fr.onload = function(e) {
                    if (f.type && f.type.match('image/.+'))
                        editCommand('insertHTML', 
                            $("<img />").attr('src', e.target.result)[0]
                            .outerHTML);
                }
            }(f));
        }
    });

});
