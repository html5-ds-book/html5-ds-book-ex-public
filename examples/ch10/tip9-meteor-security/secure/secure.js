Notes = new Meteor.Collection("Notes");

if (Meteor.isClient) {
  Template.list.items = function () {
    return Notes.find();
  };

  Template.list.events({
    'click button' : function () {
      Notes.insert({
        text: $('input').val()
      });
    }
  });
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});


}


if (Meteor.isServer) {
   Meteor.startup(function () {
    //initialize
    if(Notes.find().count() < 1){
      Notes.insert({
        text: "awesomeness"
      });
    }
  });
   //allow access to user
Notes.allow({
      insert: function (userId, doc) {
        console.log(userId);
        console.log(doc);
        //do the check for the permisin and return true if allowed
        return true;
      }
    });

}
