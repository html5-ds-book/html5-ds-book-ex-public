$(function() {

  /*
  UTF support by http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html
  */
  //method by  Johan Sundström
  function utf8ToB64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  //method by  Johan Sundström
  function b64ToUtf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }


  function arrayToString(inputArray){
    var stringData = '';
    var bytes = new Uint8ClampedArray(inputArray);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        stringData += String.fromCharCode(bytes[i]);
    }
    return stringData;
  }

  function stringToArray(raw){
   var rawLength = raw.length,
       array = new Uint8ClampedArray(new ArrayBuffer(rawLength));
    for(i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
   return array;
  }

  $("#text").keyup(function(e) {
    var currentValue = $(this).val();
    $("#content").val(utf8ToB64(currentValue));
  });

  //create some canvas data
  var canvas = $('#myCanvas')[0],
      context = canvas.getContext('2d');
  context.beginPath();
  context.rect(0, 0, 100, 100);
  context.fillStyle = 'green';
  context.fill();

  var imgData = context.getImageData(0,0, 200, 200);
  //log image data to see what is contianed inside
  console.log(imgData);
  console.log(imgData.data);

  var stringData = arrayToString(imgData.data),
      b64encoded = btoa(stringData);

  var originalStringData = atob(b64encoded),
      originalArray = stringToArray(originalStringData);

  console.log(originalArray);
  $("#imgBase").text(b64encoded);

});
