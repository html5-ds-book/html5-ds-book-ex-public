angular.module('chart', []).directive('chart', function() {
    var dir = {};
    dir.restrict = 'E';
    dir.scope = {
        data: '&',
        options: '&'
    }
    dir.link = function(scope, el, attrs) {
        console.log(scope)
        var data = scope.data(),
            opts = scope.options(),
            flot = $.plot(el, data, opts);
        function updateOnData(newdata) {
            data = newdata;
            flot.setData(data);
            flot.setupGrid();
            flot.draw();
        };
        function updateOnOptions(options) {
            opts = options;
            flot = $.plot(el, data, opts);
        }
        
        scope.$watch('data()', updateOnData, {objectEquality: true});
        scope.$watch('options()', updateOnOptions, {objectEquality: true});
    }
    return dir;
});

