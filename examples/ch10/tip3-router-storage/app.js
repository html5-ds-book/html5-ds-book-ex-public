var wwwApp = angular.module('wiki', 
    ['storage', 'markdown', 'ngSanitize'])
    .config(['$routeProvider', '$locationProvider', 
        function($routeProvider, $locationProvider) {
            $locationProvider
                .html5Mode(true).hashPrefix('!');
            $routeProvider.when('/edit/:page', {
                templateUrl: '../edit.html',
                controller: EditController
            })
            .when('/:page', {
                templateUrl: 'view.html',
                controller: ViewController
            }) 
        }]);

