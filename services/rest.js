app.factory('REST', function($http,HttpErrorHandler) {

    //TODO: Load base url with enviroment
    var REST = function (module) {
        var self = this;
        self.module = module;
        self.list=function (query) {

            query = !query?{}:query;

            return $http.get('/libs/api/'+self.module+"/?"+window.decodeURI(Qs.stringify(query)),{

                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            })
                .then(function (response) {
                    console.log(response);

                 return response.data;

                },HttpErrorHandler);


        }



    };


    return REST;
});