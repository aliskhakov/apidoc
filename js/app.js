var app = new angular.module('apidoc', ['ui.codemirror']);

app.controller('ApidocController', ['$scope', 'DataService', function ($scope, dataService){
    $scope.data = dataService;

    $scope.editorOptions = {
        lineNumbers: false,
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: "application/ld+json",
        lineWrapping: true,
        /*inputStyle: "textarea"*/
    };
}]);

app.directive('adForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'templates/form.html'
    };
});

app.directive('adResult', ['MdService', function(mdService){
    return {
        restrict: "E",
        link: function (scope, element){
            scope.$watch(function() {
                element.html(mdService.makeMD(scope.data));
            });
        }
    }
}]);
