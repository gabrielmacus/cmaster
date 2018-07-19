app.factory('REST', function($http,HttpErrorHandler) {

    //TODO: Load base url with enviroment
    var REST = function (module) {
        var self = this;
        self.module = module;
        self.readById=function (id) {

            return $http.get('/libs/api/'+self.module+"/"+id)
                .then(function (response) {
                    return response.data;
                },HttpErrorHandler);

        };
        self.list=function (query) {

            query = !query?{}:query;

            return $http.get('/libs/api/'+self.module+"/?"+window.decodeURI(Qs.stringify(query)),{

                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            })
                .then(function (response) {


                 return response.data;

                },HttpErrorHandler);


        };
        self.save=function (item,validationCallback) {

            var url = '/libs/api/'+self.module+"/";
            if(item.id)
            {
                url+=item.id;
            }
            return $http({
                method:'post',
                url:url,
                data:window.param(item),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            })
                .then(function (response) {

                    return response.data;

                },function (error) {
                    if(error.status == 400)
                    {
                        validationCallback(error.data);
                    }
                    else {

                        HttpErrorHandler(error)
                    }

                });



        }
        self.delete=function (id) {
            return $http.delete('/libs/api/'+self.module+"/"+id,{

                headers: {}

            })
                .then(function (response) {
                    console.log(response);

                    return response.data;

                },HttpErrorHandler);


        };



    };


    return REST;
});