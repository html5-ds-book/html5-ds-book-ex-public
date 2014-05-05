$(function() {

  var fr = new FileReader();

  $('#abort').click(function(){
    fr.abort();
    console.log('aborting file change');
  });

  $('#file').on('change', function(e) {
    for (var i = 0; i < this.files.length; i++) {

      var f = this.files[i];
      fr = new FileReader();

      fr.onerror = function (e) {
        $('#state').append('error happened<br />').append(e).append('\n');
      }

      fr.onprogress = function (e) {
        var percent = (e.loaded * 100 / e.total).toFixed(1);
        $('#progress').attr('max', e.total).attr('value', e.loaded);
        $('#percent').val(percent + ' %');
      }

      fr.onabort = function() {
        $('#state').append('aborted<br />');
      }

      fr.onloadstart = function (e) {
        $('#state').append('started loading<br />');
      }

      if (f.type && (f.type.match('image/.+')) || (f.type.match('video/.+'))) {
        fr.readAsDataURL(f);
      } else if (f.type.match('text/.+')) {
        fr.readAsText(f);
      } else {
        $('#state').append('unknown type of file loaded, reading first 30 bytes');
      }

      fr.onload = function(e) {
        console.log(e);
        $('#state').append('finished reading <br />');
        appendContents(f,e);
      }
      //add file meta information
      $('#fileInfo').html(getMetaData(f));
    }
  });

  $('#slice').click(function(){
    var fileList = $('#file').prop('files');
    $.each(fileList, function(i,file) {
      fr = new FileReader();
      var blob = file.slice(0, 15);
      fr.readAsBinaryString(blob);
      fr.onload = function(e) {
        $("<pre />").text(e.target.result).appendTo("#content");
      }
    });
  });

  function getMetaData(file){
    var text = "<b>file: </b>" + file.name + " <br />";
    text += "<b>size: </b>" + file.size + " <br />";
    text += "<b>type: </b>" + file.type + " <br />";
    text += "<b>last modified: </b>" + file.lastModifiedDate.toString() + " <br />";
    return text;
  }

  function appendContents(f,e) {
    if (f.type && f.type.match('image/.+')){
      $("<img />").attr('src', e.target.result).appendTo("#content");
    } else {
      $("<pre />").text(e.target.result).appendTo("#content");
    }
  };

});
