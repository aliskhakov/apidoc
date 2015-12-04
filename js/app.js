var app = new angular.module('apidoc', []);

app.controller('ApidocController', ['$scope', 'DataService', function ($scope, dataService){
    $scope.data = dataService;
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
