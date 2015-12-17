var app = new angular.module('apidoc', ['ui.codemirror', 'ngRoute', 'LocalStorageModule']);

app.config(['$routeProvider', 'localStorageServiceProvider',
    function($routeProvider, localStorageServiceProvider) {
        $routeProvider.
            when('/api', {
            templateUrl: 'templates/api-list.html',
            controller: 'ApiListController'
            }).
            when('/api/:apiId', {
                templateUrl: 'templates/api-detail.html',
                controller: 'ApiDetailController'
            }).
            otherwise({
                redirectTo: '/api'
            });

        localStorageServiceProvider.setPrefix('apidoc');
        localStorageServiceProvider.setStorageType('localStorage');
        localStorageServiceProvider.setNotify(false, false);
    }
]);

app.controller('ApiListController', ['$scope', 'DataService', function ($scope, dataService){
    $scope.data = dataService;
}]);

app.controller('ApiDetailController', ['$scope', '$routeParams', 'DataService',
    function ($scope, $routeParams, dataService){
        $scope.data = dataService;

        $scope.apiId = $routeParams.apiId;

        $scope.api = $scope.data.apis[$scope.apiId];

        $scope.editorOptions = {
            lineNumbers: false,
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: "application/ld+json",
            lineWrapping: true
        };
    }
]);

app.directive('adForm', function(){
    return {
        scope: {
            data: '='
        },
        restrict: 'E',
        templateUrl: 'templates/form.html'
    };
});

app.directive('adResult', ['MdService', function(mdService){
    return {
        scope: {
            data: '='
        },
        restrict: "E",
        link: function (scope, element){
            scope.$watch(function() {
                element.html(mdService.makeMD(scope.data));
            });
        }
    }
}]);
