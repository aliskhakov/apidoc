app.service(
    'DataService',
    [
        '$location',
        '$rootScope',
        'localStorageService',
        function($location, $rootScope, localStorageService){
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

            return {
                apis: (function (){
                    var apis = [];

                    localStorageService.bind($rootScope, 'apis', apis);

                    return apis;
                })(),

                addApi: function(){
                    this.apis.push(new Api());
                },

                delApi: function(){
                    this.apis.splice(index, 1);

                    $location.path("/");
                }
            };
        }
    ]
);
