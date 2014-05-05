$(function() {
    var editCommand = function(cmd, arg) { 
        return document.execCommand(cmd, true, arg); 
    };
    $('.table').on('click', function() {
        var rows = prompt("How many rows?"), 
            cols = prompt("How many columns?");
        var loc = document.getSelection().getRangeAt(0)
                .startContainer.parentElement;
        while (loc.id != 'edit' && loc.nodeName.toLowerCase() != 'table') 
            loc = loc.parentElement;
        var isInTable = loc.nodeName.toLowerCase() == 'table';
        var contents;
        if (isInTable) 
            contents = $(loc).find('tr').toArray().map(function(tr) { 
                return $(tr).find('td').toArray().map(function(td) { 
                    return td.innerHTML; 
                }); 
            });
        var table = $('<table />');
        for (var k = 0; k < rows; ++k) {
            var row = $('<tr />').appendTo(table);
            for (var i = 0; i < cols; ++i) {
                var cell = $('<td />').appendTo(row);
                if (contents && contents[k] && contents[k][i])
                    cell.html(contents[k][i]);                
                else cell.html('&nbsp;');
            }            
        }
        if (isInTable) $(loc).remove();
        editCommand('insertHTML', table[0].outerHTML);
    });    

});

