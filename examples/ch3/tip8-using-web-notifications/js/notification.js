var simpleNotification = (function () {
    var my = {};
     my.show = function (data) {
      if (window.webkitNotifications) {
        //check if there is a support for webkitNotifications
        if (window.webkitNotifications.checkPermission() == 0) {
          console.log("creating notification")
          var notification = webkitNotifications.createNotification(data.icon, data.title, data.body);
          notification.show();
          //set timeout to hide it
          setTimeout(function(){
              notification.cancel();
           }, data.timeout);
        } else {
          webkitNotifications.requestPermission(function () {
            //call the same function again
            my.show(data);
          });
        }
      }else if (window.Notification) {
        //Currenlty a fallback, but this should be the real implementation on all browsers
        if ("granted" === Notification.permissionLevel()) {
          var notification = new Notification(data.title, data);
          notification.show();
        } else if ("default" === Notification.permissionLevel() ) {
          Notification.requestPermission(function () {
            //call the same function again
            my.show(data);
          });
        }
      }else{
        //Notifications not supported,going with fallback
       data.errorCallback();
      }
    };
  return my;
}());
