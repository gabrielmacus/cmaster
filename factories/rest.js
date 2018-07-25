app.factory('REST', function($http,HttpErrorHandler) {

    //TODO: Load base url with enviroment
    var baseUrl = '/libs/api/';

    var REST = function (module) {
        var self = this;
        self.module = module;
        self.readById=function (id,query) {

            query = !query?{}:query;

            return $http.get(baseUrl+self.module+"/"+id+"?"+window.decodeURI(Qs.stringify(query)))
                .then(function (response) {
                    return response.data;
                },HttpErrorHandler);

        };
        self.list=function (query,onError) {

            query = !query?{}:query;

            return $http.get(baseUrl+self.module+"/?"+window.decodeURI(Qs.stringify(query)),{

                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            })
                .then(function (response) {


                 return response.data;

                },function (error) {

                    if(onError)
                    {
                        onError(error);
                    }

                    HttpErrorHandler(error);

                });


        };
        self.save=function (item,validationCallback,multipart) {

            var url = baseUrl+self.module+"/";
            if(item.id)
            {
                url+=item.id;
            }
            var request = {
                method:'post',
                url:url,
                data:window.param(item),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            };


            if(multipart)
            {          var payload = new FormData();


            //console.log(item);
                for(var k in item)
                {
                    if(k  == "base64")
                    {
                       //Nothing...
                    }
                    else if(item[k] instanceof Array)
                    {
                        for (var j in item[k])
                        {
                            payload.append(k+"[]", item[k][j]);
                        }

                    }
                    else
                    {

                        payload.append(k, item[k]);
                    }

                }

            /*
                for(var k in item)
                {
                    if(item[k] instanceof FileList)
                    {
                        var fileList = [];
                        for(var i =0;i<item[k].length;i++)
                        {
                            fileList.push(item[k][i]);
                        }
                        item[k] =fileList;

                    }

                    if(item[k] instanceof Array)
                    {


                        for(var i =0;i<item[k].length;i++)
                        {

                            payload.append(k+"[]", item[k][i]);

                        }
                    }
                    else
                    {
                        for (var j in item[k])
                        {

                            payload.append(j, item[k][j]);
                        }
                    }
                }*/


                request.data = payload;
                request.headers['Content-Type'] = undefined;
                request.transformRequest= angular.identity;
            }

            return $http(request)
                .then(function (response) {

                    return response.data;

                },function (error) {
                    if(error.status == 400 && validationCallback)
                    {
                        validationCallback(error.data);
                    }
                    else {

                        HttpErrorHandler(error)
                    }

                });



        }
        self.delete=function (id) {
            return $http.delete(baseUrl+self.module+"/"+id,{

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