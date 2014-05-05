function keysOf(obj) {
    var k = [];
    for (var key in obj) 
        if (obj.hasOwnProperty(key))
            k.push(key);
    return k;
}
function chat() {
    var self = {},
        users = {},
        messages = [];

    // Identify the user by comparing the data provided
    // for identification with the data stored server-side
    function identify(user) {
        return users[user.name] && user.token 
            == users[user.name].token;
    }
    // Send an event to all connected chat users that
    // are listening for events
    function emit(event) {
        console.log(event);
        for (var key in users) if (users.hasOwnProperty(key))
            if (users[key].send) users[key].send(event);
    }
    // This function resets the timeout countdown for a
    // specified user. The countdown is reset on every user
    // action and every time the browser sends a ping
    // If the countdown expires, the user is considered
    // to have closed the browser window and no longer present
    function resetTimeout(user) {
        if (user.timeout) { 
            clearTimeout(user.timeout);
            user.timeout = null;
        }
        user.timeout = setTimeout(function() {
            self.leave(user, function() {});
        }, 60000);
    }

    // When a user attempts to join, he must reserve a
    // unique name. If this succeeds, he is given an auth
    // token along with the name. Only actions performed
    // using this token will be accepted as comming from
    // the user. After the user joins a list of users and
    // past messages are sent to him along with the
    // authentication information.
    self.join = function(name, cb) {
        if (users[name]) return cb(name + " is in use");
        users[name] = {
            name: name,
            token: Math.round(Math.random() * Math.pow(2, 30))
        }
        resetTimeout(users[name]);
        emit({type: 'join', name: name});
        cb(null, { you: users[name], messages: messages, 
           users: keysOf(users) });
    }
    // The leave function is called when the user leaves
    // after closing the browser window.
    self.leave = function(user, cb) {
        if (!identify(user)) return 
        clearTimeout(users[user.name].timeout);
        delete users[user.name];
        emit({type: 'leave', name: user.name});
        cb(null);
    }
    // The message function allows the user to send a 
    // message. The message is saved with a timestamp
    // then sent to all users as an event.
    self.msg = function(user, text) {
        if (!identify(user)) return; 
        resetTimeout(users[user.name]);
        var msg = {
            type: 'msg',
            name: user.name,
            text: text,
            time: Date.now()
        }
        messages.push(msg);
        emit(msg);
    }
    // The ping function allows the browser to reset
    // the timeout. It lets the server know that the
    // user hasn't closed the chat yet.
    self.ping = function(user) { 
        if (identify(user)) 
            resetTimeout(users[user.name]); 
    }
    // The listen function allows the user to provide
    // a callback function to be called for every event.
    // This way the server can call client-side code.
    self.listen = function(user, send, cb) {
        if (!identify(user)) return 
        users[user.name].send = send;
    }
    return self;
};
module.exports = chat;

