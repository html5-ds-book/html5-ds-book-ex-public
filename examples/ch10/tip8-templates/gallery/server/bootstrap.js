// if the database is empty fill it with data
Meteor.startup(function () {
  //has some images
  if (Images.find().count() < 4) {

    var images =[
      {
        name: "Awesome Cat",
        url: "img/1.jpg",
        votes: "0"
      },{
        name:"Cool Cat",
        url: "img/2.jpg",
        votes: "0"
      },{
        name:"Mjauuu",
        url: "img/3.jpg",
        votes: "0"
      },{
        name:"The Cat",
        url: "img/4.jpg",
        votes: "0"
      }

    ];
    // you could use just insert with iterating but then the structure is different
    for (var i = 0; i < images.length; i++) {
      Images.insert(images[i]);
    }

    Users.insert({
      name: "awesome user",
      pointsLeft: "30"
    });

  }
});

