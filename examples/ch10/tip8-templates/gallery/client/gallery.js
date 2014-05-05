Images = new Meteor.Collection('images');
Users = new Meteor.Collection('users');

Session.setDefault('user', null);

Meteor.autorun(function () {
  Meteor.subscribe('images');
  Meteor.subscribe('users');
});

Template.gallery.images = function () {
  return Images.find({}, {sort: {name: 1}});
};

Template.votes.numberOfVotes = function () {
  console.log('before');
  var user = Session.get('user');
  console.log(user);
  if (user.pointsLeft < 1) {
    return "NO";
  } else {
    return user.pointsLeft;
  }
};

Template.main.hasUserEnteredName = function () {
  var containsName = Session.get('user') != null;
  return containsName;
}

Template.main.events({
    'click .name' : function () {
      var name = $('input').val();
      var currentUser = Users.findOne({"name": name});
      if (currentUser === undefined) {
        console.log('inserting new user');
        Users.insert({
          'name': name,
          'pointsLeft': '50'
        });
        currentUser = Users.findOne({"name": name});
      }
      Session.set('user', currentUser);
      console.log('you just set name in this session');
      console.log(currentUser);
    }
});

Template.gallery.events({
  'click .vote' : function(e,t) {
    voteForImage(this._id,1 + this.votes, Session.get('user'));
    //add some logging just to see what happens in the background
    console.log(e);
    console.log(t);
    console.log(this);
  }
});

function voteForImage(imgId, votes, currentUser) {
  if(currentUser.pointsLeft > 0){
    currentUser.pointsLeft--;
    Users.update(
        {_id:currentUser._id},
        {$set:{pointsLeft:currentUser.pointsLeft}}
      );
    Session.set('user',currentUser);
    Images.update(
        {_id: imgId},
        {$set:{"votes":votes}}
      );
  }
}

Template.footer.footerText = function (){
  return "Example Inc";
}
