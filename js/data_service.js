app.service('DataService', ['$location', function($location){
    var Api = function (){
        this.title = "";

        this.methods = [new Method()];

        this.addMethod = function (){
            this.methods.push(new Method())
        };

        this.delMethod = function (index){
            this.methods.splice(index, 1);
        };
    };

    var Method = function (){
        this.title = "";

        this.url = "";

        this.type = "";

        this.params = [];

        this.response = "";

        this.addParam = function (){
            this.params.push(new Param());
        };

        this.delParam = function (index){
            this.params.splice(index, 1);
        };
    };

    var Param = function (){
        this.name = "";

        this.value = "";
    };

    function addApi(){
        this.apis.push(new Api());
    }

    function delApi(index){
        this.apis.splice(index, 1);

        $location.path("/");
    }

    return {
        apis: [new Api()],
        addApi: addApi,
        delApi: delApi
    }
}]);
