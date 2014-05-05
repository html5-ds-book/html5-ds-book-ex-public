function Controller($scope, $timeout) {
    $scope.chart = {
        data: [getRandomData()],
        options: {lines: {fill:true}}
    };
    setInterval(function updateData(delay) {
        $scope.$apply(function() {
            $scope.chart.data[0] = getRandomData();
        });
    }, 50);
}

