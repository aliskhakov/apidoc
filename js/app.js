var app = new angular.module('apidoc', ['ui.codemirror']);

app.controller('ApidocController', ['$scope', 'DataService', function ($scope, dataService){
    $scope.data = dataService;

    $scope.editorOptions = {
        lineNumbers: false,
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: "application/ld+json",
        lineWrapping: true
    };
}]);

app.directive('adApis', function(){
    return {
        restrict: 'E',
        templateUrl: 'templates/apis.html'
    };
});

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
