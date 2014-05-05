function TodoListController($scope) {
    $scope.tasks = [
        {text: "Write a todo list", 
            complete: false, shown: true },
        {text: "Save it to the backend", 
            complete: false, shown: true },
    ];
    $scope.addTask = function() {
        $scope.tasks.push({
            text: $scope.taskToAdd, 
            complete: false, 
            shown:true
        });
        $scope.taskToAdd = "";
    };
    $scope.hideComplete = function() {
        $scope.tasks.forEach(function(t) {
            if (t.complete) 
                t.shown = false;
        });
    };
}
