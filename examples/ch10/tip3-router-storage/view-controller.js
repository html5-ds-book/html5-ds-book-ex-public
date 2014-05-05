function ViewController($scope, $routeParams, Storage) {
    $scope.page = Storage.get($routeParams.page || 'index');
}

