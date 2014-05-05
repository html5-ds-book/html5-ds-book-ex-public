(function(){
  var video = document.getElementById('theVideo'),
      textTracks = video.textTracks;

   for(var i=0; i < textTracks.length; i++){
    console.log(textTracks[i]);
   }
}
())
