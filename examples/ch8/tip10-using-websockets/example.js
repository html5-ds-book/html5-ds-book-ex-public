var shoe = require('shoe'),
    dnode = require('dnode');

$(function() {

    // Add a message to the message div
    function addMsg(msg) { 
        var dMsg = $("<div />").addClass('msg'),
            dName = $("<span />").addClass('name')
                .text(msg.name).appendTo(dMsg),
            dText = $("<span />").addClass('text')
                .text(msg.text).appendTo(dMsg);
        dMsg.appendTo("#chat");
        $("#chat").scrollTop($("#chat")[0].scrollHeight);
    }

    // Re-display a list of the present users.
    function showUsers(users) {
        $("#users").html('');
        users.forEach(function(name) {
            $("<div />").addClass('user')
                .text(name).appendTo('#users');
        });
    }

    // Create a client-side web sockets stream
    // piped to a dnode instance
    var stream = shoe('/chat');
    var d = dnode();
    // When the remote chat API becomes available
    d.on('remote', function (chat) {
        // Attempt to join the room until a suitable 
        // nickname that is not already in use is found
        function join(cb, msg) {
            var name = prompt(msg || "Enter a name");
            chat.join(name, function(err, data) {
                if (err) join(cb, err);
                else cb(data);
            });
        }
        join(function(data) {
            var me = data.you,
                users = data.users;
            // Show the users and messages after joining
            showUsers(users);
            data.messages.forEach(addMsg);
            // Allow the user to send messages
            $("#input").on('keydown', function(e) {
                if (e.keyCode == 13) {
                    // sending works by calling the 
                    // remote's msg function.
                    chat.msg(me, $(this).val());
                    $(this).val('');
                }

            });
            // Tell the remote we're listening for
            // events
            chat.listen(me, function(e) {
                if (e.type == 'msg') 
                    return addMsg(e);
                if (e.type == 'leave') 
                    delete users[users.indexOf(e.name)];
                else if (e.type == 'join') 
                    users.push(e.name);
                showUsers(users);
            }); 
            // Tell the remote every 30 seconds that
            // we're still active
            setInterval(function() {
                chat.ping(me);
            }, 30000);

        });
    });
    // pipe dnode messages to the websocket stream
    // and messages from the stream to dnode
    d.pipe(stream).pipe(d);
});

