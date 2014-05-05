(function (){
  var button = document.getElementById('start'),
      video = document.getElementById('myVideo'),
      canvas = document.getElementById('myCanvas');

  button.addEventListener("click", function() {
    console.log('started drawing video');
    drawVideo();
  },false);

  function drawVideo(){
   var context = canvas.getContext('2d');
   context.drawImage(video, 0, 0);

   var pixels = context.getImageData(0,0,640,480);
   pixels = toGrayScale(pixels);
   context.putImageData(pixels,0,0);
   // re-draw
   setTimeout(drawVideo,10);
  }
 
  function toGrayScale(pixels) {
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
      var r = d[i],
          g = d[i+1],
          b = d[i+2],
          v = 0.2126*r + 0.7152*g + 0.0722*b;
      d[i] = d[i+1] = d[i+2] = v
    }
    return pixels;
  };
}())
