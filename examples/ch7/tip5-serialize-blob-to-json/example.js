$(function() {

  var canvas = $('#myCanvas')[0],
      context = canvas.getContext('2d');
  context.beginPath();
  context.arc(50, 50, 20, 0, Math.PI*2, true);
  context.closePath();
  context.fillStyle = 'green';
  context.fill();

  var imgdata = context.getImageData(0,0, 50, 50);
  console.log(imgdata);
  console.log(imgdata.data);

  function arrayToString(inputArray){
    var stringData = '',
        len = inputArray.byteLength;
    for (var i = 0; i < len; i++) {
        stringData += String.fromCharCode(inputArray[i]);
    }
    return stringData;
  }

  var imageEncoded = btoa(arrayToString(imgdata.data));

  var jsObject = {
    "name":"pie chart or not a pie...chart",
    "dataURL" : {
      "jpeg": canvas.toDataURL('image/jpeg'),
      "png": canvas.toDataURL('image/png')
    },
    "image" : imageEncoded
  };

  console.log(jsObject);
  var jsonString = JSON.stringify(jsObject, null , 2);
  $("#generatedJson").text(jsonString);

});
