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
            var md = mdService.addTitle(scope.data.title, '=');

            angular.forEach(scope.data.methods, function(method, key) {
                md += mdService.addTitle(method.title, "-");
                md += mdService.addKeyVal("URL", method.url);
                md += mdService.addKeyVal("Type", method.type);

                if (method.params.length > 0) {
                    md += "**Parameters**\n\n";
                }

                angular.forEach(method.params, function(param, key) {
                    md += mdService.addSubKeyVal(param.name, param.value, " - ");
                });

                if (method.params.length > 0) {
                    md += "\n\n";
                }

                md += mdService.addBlock("Response", method.response);
            });

            element.html("<h4>Markdown</h4><pre><code>" + md + "</code></pre>");
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

app.service('MdService', function(){
    function addTitle(title, str) {
        var ret = "";

        if (title.length > 0) {
            ret =  title + "\n" + new Array(title.length + 1).join(str) + "\n\n";
        }

        return ret;
    }

    function addKeyVal(key, val) {
        var ret = "";

        if (val.length > 0){
            ret += "**" + key + ":** " + val + "\n\n";
        }

        return ret;
    }

    function addBlock(key, val) {
        var ret = "";

        if (val) {
            ret += "```\n";
            angular.forEach(val.split("\n"), function (row, key) {
                ret += "    " + row + "\n";
            });
            ret += "```\n";

           ret = "**" + key + ":**\n" + ret;
        }

        return ret;
    }

    function addSubKeyVal(key, val) {
        var ret = "";

        if (key.length > 0){
            ret += " - " + key + ": " + val + "\n";
        }

        return ret;
    }

    return {
        addTitle: addTitle,
        addKeyVal: addKeyVal,
        addSubKeyVal: addSubKeyVal,
        addBlock: addBlock
    }
});
