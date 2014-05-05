// DB collection of movies
Images = new Meteor.Collection("images");

// DB collection of users
Users = new Meteor.Collection("users");

// Publish complete set of lists to all clients.
Meteor.publish('images', function () {
  return Images.find();
});

// Publish for users
Meteor.publish('users', function () {
  return Users.find();
});

