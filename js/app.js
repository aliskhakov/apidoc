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

app.service('DataService', [function(){
    function method(){
        return {
            "title": "",
            "url": "",
            "type": "",
            "params": [],
            "response": ""
        };
    }

    function addMethod(){
        this.methods.push(method());
    }

    function delMethod(index) {
        this.methods.splice(index, 1);
    }

    function addParam(index) {
        this.methods[index].params.push({
            "name": "",
            "value": ""
        });
    }

    function delParam(parent_index, index){
        this.methods[parent_index].params.splice(index, 1);
    }

    return {
        title: "",
        methods: [method()],
        addMethod: addMethod,
        delMethod: delMethod,
        addParam: addParam,
        delParam: delParam
    }
}]);

app.service('MdService', function() {
    function makeMD(data) {
        var md = [addTitle(data.title, '=')];

        angular.forEach(data.methods, function (method, key) {
            md.push(addMethod(method));
        });

        return "<h4>Markdown</h4><pre><code>" +
            md.filter(joinFilter).join("\n\n\n") +
            "</code></pre>";
    }

    function addTitle(title, str) {
        if (title.length > 0)
            return [title, new Array(title.length + 1).join(str)].join("\n");

        return "";
    }

    function addMethod(method) {
        return (
            [
                addTitle(method.title, "-"),
                addKeyVal("URL", method.url),
                addKeyVal("Type", method.type),
                addParams(method.params),
                addBlock("Response", method.response)
            ].filter(joinFilter)
        ).join("\n\n");
    }

    function joinFilter(item) {
        return item.length > 0;
    }

    function addParams(params) {
        var md = [];

        if (params.length > 0) {
            md.push("**Parameters**");
        }

        angular.forEach(params, function(param, key) {
            md.push(addSubKeyVal(param.name, param.value, " - "));
        });

        return md.join("\n");
    }

    function addKeyVal(key, val) {
        var ret = "";

        if (val.length > 0){
            ret += "**" + key + ":** " + val;
        }

        return ret;
    }

    function addBlock(key, val) {
        var ret = "";

        if (val) {
            ret = ["**" + key + ":**", "```", val, "```"].join("\n");
        }

        return ret;
    }

    function addSubKeyVal(key, val) {
        var ret = "";

        if (key.length > 0){
            ret += " - " + key + ": " + val;
        }

        return ret;
    }

    return {
        makeMD: makeMD
    }
});
