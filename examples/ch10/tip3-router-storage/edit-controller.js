function EditController($scope, Storage, $routeParams) {
    $scope.page = Storage.get($routeParams.page);
    $scope.savePage = function() {
        Storage.save({id: $scope.page.id, text: $scope.page.text});
    };
}

