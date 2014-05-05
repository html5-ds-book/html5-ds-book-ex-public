angular.module('markdown', []).filter('markdown', function() {
    return function(input) {
        return input ? markdown.toHTML(input) : ''
    };
});

