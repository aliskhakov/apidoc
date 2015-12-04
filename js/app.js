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
    function link(scope, element){
        scope.$watch(function() {
            var md = [mdService.addTitle(scope.data.title, '=')];

            angular.forEach(scope.data.methods, function(method, key) {
                md.push(mdService.addMethod(method));
            });

            element.html("<h4>Markdown</h4><pre><code>" + md.join("\n\n\n") + "</code></pre>");
        });
    }

    return {
        restrict: "E",
        link: link
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
    function addTitle(title, str) {
        return [title, new Array(title.length + 1).join(str)].join("\n");
    }

    function addMethod(method) {
        return [
            addTitle(method.title, "-"),
            addKeyVal("URL", method.url),
            addKeyVal("Type", method.type),
            addParams(method.params),
            addBlock("Response", method.response)
        ].join("\n\n");
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
        addTitle: addTitle,
        addMethod: addMethod
    }
});
