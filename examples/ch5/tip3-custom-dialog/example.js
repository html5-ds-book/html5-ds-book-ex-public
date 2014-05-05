$(function() {
    dialog("tmplExample", {title: 'Login to continue', user: 'jack.r', pass: ''}, {
        'button.login => click': function(dialog, ev) { 
            var data = dialog.data();
            if (data.pass == 'secret') { dialog.close(); $('.secret').show(); }            
            else { dialog.find('p.error').text('Invalid password').show(); }
        }
    });
});

