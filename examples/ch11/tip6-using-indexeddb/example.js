var app = angular.module('todo', []);
    
app.filter('age', function() {
    return function(timestamp) {
        var s = (Date.now() - timestamp) / 1000 / 3600;
        if (s < 1) return "now";
        if (s < 24) return s.toFixed(0) + 'h';
        if (s < 24*7) return (s / 24).toFixed(0) + 'd';
        return (s /24/7).toFixed(0) + 'w';
    };
});

var DAY = 1000*3600*24;

function TodoController($scope, DBTodo) {
    
    $scope.svc = DBTodo.data;
    $scope.archive = 0;
    $scope.from = new Date(Date.now() - 3*DAY)
        .toISOString().substr(0, 10);
    $scope.to = new Date(Date.now() + 1*DAY)
        .toISOString().substr(0, 10);

    $scope.todos = [];
    
    function updateItems() {
        DBTodo.getItems(
            new Date($scope.from).getTime(), 
            new Date($scope.to).getTime(), 
            function(err, items) {
                $scope.todos = items;
            });
    };

    $scope.addItem = function() {
        DBTodo.addItem({
            date: Date.now(), 
            text: $scope.text, 
            archived: 0, 
            done: false
        }, function() {
            $scope.text = "";
            updateItems();
        });
    }

    $scope.updateItem = function(item) {
        DBTodo.updateItem(item);
    };

    $scope.archiveDone = function(item) {
        DBTodo.archive(updateItems);
    };

    $scope.$watch('from',updateItems); 
    $scope.$watch('to', updateItems);

}

