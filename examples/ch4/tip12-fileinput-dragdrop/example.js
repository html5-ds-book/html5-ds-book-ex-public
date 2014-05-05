$(function() {
    $("#content").on('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.originalEvent);
        var files = e.originalEvent.dataTransfer.files;
        for (var k = 0; k < files.length; ++k) {
            var f = files[k];
            console.log(f);
            var fr = new FileReader();
            if (f.type && f.type.match('image/.+')) 
                fr.readAsDataURL(f);
            else
                fr.readAsText(f);
            (function(f) {
                fr.onload = function(e) {
                    if (f.type && f.type.match('image/.+'))
                        $("<img />").attr('src', e.target.result).appendTo("#content");
                    else
                        $("<pre />").text(e.target.result).appendTo("#content");
                }
            }(f));
        }
        var items = e.originalEvent.dataTransfer.items;
        for (var k = 0; k < items.length; ++k) {
            if (items[k].type == 'text/html') {
                items[k].getAsString(function (html) {
                    $(html).appendTo("#content");
                });
            }
        }
    });
});

