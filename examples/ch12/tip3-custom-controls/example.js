var videoController = (function () {
  var my = {};

  function findElement(selector){
   var result = document.querySelector(selector);
   if (!result) {
    throw "element " + selector + "not found ";
   }
   return result;
  }

  function updatePlaybackRate(el, speed) {
   el.playbackRate += speed;
  }

  function updateVolume(el, amount) {
   el.volume += amount;
  }

  my.play = function(video) {
   var el = findElement(video);
   el.play();
  }

  my.pause = function(video) {
   var el = findElement(video);
   el.pause();
  }

  my.toggleMute = function(video) {
   var el = findElement(video);
    el.muted = !el.muted;
  }

  my.increasePlaybackRate = function(video, speed) {
   var el = findElement(video);
   updatePlaybackRate(el, speed);
  }

  my.decreasePlaybackRate = function(video, speed) {
   var el = findElement(video);
   updatePlaybackRate(el, -speed);
  }

  my.increaseVolume = function(video, amount) {
   var el = findElement(video);
   updateVolume(el, amount)
  }

  my.decreaseVolume = function(video, amount) {
   var el = findElement(video);
   updateVolume(el, -amount)
  }

  my.displayRate = function (video, output) {
   var vid = findElement(video),
       out = findElement(output);

   vid.addEventListener('ratechange', function(e) {
     console.log(e);
     out.innerHTML = 'Speed x' + this.playbackRate;
   }, false);

  }

  return my;

}());
