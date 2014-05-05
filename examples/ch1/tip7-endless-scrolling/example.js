(function() {
    // Our page getter calls the callback with a null error 
    // argument and a simple string as content, but it can also 
    // be an Ajax request. 
var page = 1;

/*
function getPage(cb) {
    $.get('/pages/' + page)
        .success(function(html) { cb(null, html); })
        .error(function() { cb("Error"); }
    page += 1;
    }
    */
function getPage(cb) {
    if (page <= 10) cb(null, 'Page ' + page);
    else cb("No more pages");
    page += 1;
};

var currentlyLoading = false;

// When triggerPxFromBottom pixels remain to be scrolled,
// start loading the next page.
var triggerPxFromBottom = 0; 

// loadNext appends the next page into the #content div.
function loadNext() {
    currentlyLoading = true;
    getPage(function(err, html) {
        // If there was an error loading the next page, indicate
        // the error to the user and stop loading pages.
        if (err) {
            $("<div />")
                .addClass('error')
                .html("No more content")
                .appendTo("#content");
        } else {
            $("<div />")
                .addClass('page')
                .html(html).appendTo("#content");
            currentlyLoading = false;
        }
    });
}
// This event handler is called when the page is scrolled in any way,
$(window).on('scroll', function() {
    var remainingPx = $(document).height() 
        - $(window).scrollTop() 
        - $(window).height();
    // If no pixels remaining to be scrolled
    if (remainingPx <= triggerPxFromBottom 
        && !currentlyLoading) 
            loadNext();
});

loadNext();

}());
