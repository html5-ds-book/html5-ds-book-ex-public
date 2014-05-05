// DB collection of movies
Movies = new Meteor.Collection("movies");

// Publish complete set of lists to all clients.
Meteor.publish('movies', function () {
  return Movies.find();
});
