app.factory('AuthenticationFactory', function($http,HttpErrorHandler,$cookies,$rootScope) {
    //TODO: Load base url with enviroment
    var baseUrl = '/libs/api/';
    return {

        user:false,
        token:false,

        OnAuthentication:function () {
            $rootScope.loggedUser = this.user;
        },
        Login:function (user,onsuccess,onerror) {
            var factory = this;
            var url = baseUrl+"user/login/";

            var request = {

                method:'post',
                url:url,
                data:window.param(user),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            };
             $http(request)
                .then(function (response) {

                    var user =response.data.user;
                    var token = response.data.token;

                    factory.user = user;
                    factory.token = token;

                    $cookies.put("_token",factory.token,{'path':'/'});


                    if(factory.OnAuthentication)
                    {
                        factory.OnAuthentication(factory);
                    }

                    onsuccess();


                },function (error) {

                    onerror(error);
                    HttpErrorHandler(error);

                });

        },
        Logout:function (callback) {

            $cookies.remove("_token",{'path':'/'});


            callback();

        },
        CheckAuthentication:function (callback) {

            var factory = this;
            $http.get('/libs/api/user/logged/')
                .then(function (response) {

                    if(response.data)
                    {

                        factory.user = response.data.user;
                        factory.token = response.data.token;
                    }

                    if(factory.OnAuthentication)
                    {
                        factory.OnAuthentication(factory);
                    }


                    callback(factory.user);

                },function(e){


                    callback(false);

                    //HttpErrorHandler(e);


                });

        }

    };
});