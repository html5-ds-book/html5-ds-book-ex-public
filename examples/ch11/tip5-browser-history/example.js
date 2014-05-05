var catson = [
  {
  "name":"Awesome cat",
  "url":"1.jpg"
  },
  {
  "name":"Crazy cat",
  "url":"2.jpg"
  },
  {
  "name":"Great cat",
  "url":"3.jpg"
  }
];

$(document).ready( function() {
  function hasSupportForHistory() {
    return window.history && history.pushState;
  }

  if ( !hasSupportForHistory() ) {
    $('body').text('Browser does not have support for History fallbacking');
    return;
  }

  $("nav div").click( function(e) {
    console.log('clicking');

    var title = $(this).text(),
        url = document.URL.substring(0, document.URL.lastIndexOf('/')) + $(this).data('url'),
        id = $(this).data('id'),
        img = '<img src="img/'+ catson[id].url +'" />',
        text = '<h1>'+catson[id].name+'</h1>';

    // change the displayed url
    history.pushState(null, title, url);
    $('#image').html(text + img);
    // stop default propagation of event
    e.preventDefault();
  })
});
