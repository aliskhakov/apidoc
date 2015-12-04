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
