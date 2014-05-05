$(function() {
    var editCommand = function(cmd, arg) { return document.execCommand(cmd, true, arg); };

    var bindings = {
        '.undo': editCommand.bind(this, 'undo'),
        '.redo': editCommand.bind(this, 'redo'),
        '.bold': editCommand.bind(this, 'bold'),
        '.italic': editCommand.bind(this, 'italic'),
        '.under': editCommand.bind(this, 'underline'),
        '.bullet': editCommand.bind(this, 'insertUnorderedList'),
        '.number': editCommand.bind(this, 'insertOrderedList')
    };
    for (var key in bindings) $(key).on('click', bindings[key]);
    
    var styles = {
        'Normal': 'P',
        'Heading 1': 'H1',
        'Heading 2': 'H2',
        'Heading 3': 'H3',
    };

    for (var key in styles) 
        $('<option>').html(key).attr('value', styles[key]).appendTo('.style');

    $('.style').on('change', function() {
        editCommand('formatBlock', $(this).val());
    });
    
});

