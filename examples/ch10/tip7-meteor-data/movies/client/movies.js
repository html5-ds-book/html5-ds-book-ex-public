// Client-side JavaScript, bundled and sent to client.
// Define mongo style collections to match server/publish.js.
Movies = new Meteor.Collection("movies");

// Always be subscribed to the movies list.
Meteor.autorun(function () {
    Meteor.subscribe('movies');
});

// fill the movies variable with data from the colleciton sorted by name
Template.movies.movies = function () {
  return Movies.find({}, {sort: {name: 1}});
};

// on click we insert a random movie
Template.movies.events({
  'click button': function(){
    Movies.insert({
      name: "random awesome movie",
      score: Math.random() * 10
    });
  }
});
