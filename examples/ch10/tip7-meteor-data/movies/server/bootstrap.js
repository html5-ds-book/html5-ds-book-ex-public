// if the database is empty fill it with data
Meteor.startup(function () {
  if (Movies.find().count() === 0) {
    var data = [
      {
        name: "North by northwest",
        score: "9.9"
      },
      {
        name: "Gone with the wind",
        score:"8.3"
      },
      {
        name: "1984",
        score: "9.9"
      }
    ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var itemId = Movies.insert({
        name: data[i].name,
        score: data[i].score,
        time: timestamp
      });
    }
  }
});
