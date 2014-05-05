$(function() {
  $('#send').click(function() {
    var dogId = $("#dogPicker :radio:checked").val();
    var comment = $('#comment').val();
    //different ways to set data
    sessionStorage.comment = comment;
    // if no data avalabe do ajax call
    if (localStorage.dogData) {
     showSelectedImage(dogId);
    } else {
      $.ajax({
        url: "dogs.json",
      }).done(function(data){
        localStorage.dogData = JSON.stringify(data);
        showSelectedImage(dogId);
      });
    }

  });

  if (localStorage.viewCount) {
    localStorage.viewCount++;
    $('#counter').val(localStorage.viewCount);
  } else {
    localStorage.viewCount = 0;
  }

  if (sessionStorage.comment) {
    $('#comment').val(sessionStorage.comment);
  }

  function showSelectedImage(dogId){
    var dogList = JSON.parse(localStorage.dogData);
    var dogFile;
    $.each(dogList.dogs, function(i,e){
      console.log(i + " " + e.file);
      if(e.id === dogId){
        dogFile = e.file;
      };
    });
    console.log(dogId);
    console.log(dogFile);
    $('#selectedImage').html("<img src='images/" + dogFile + "'></img>");
  }
});
