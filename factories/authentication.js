app.factory('AuthenticationFactory', function($http,HttpErrorHandler) {
    //TODO: Load base url with enviroment
    var baseUrl = '/libs/api/';
    return {

        Login:function (user) {

            var url = baseUrl+"user/login/";

            var request = {
                method:'post',
                url:url,
                data:window.param(user),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            };
            return $http.post(url,request)
                .then(function (response) {
                    console.log(response);
                },HttpErrorHandler);

        },
        
        CheckAuthentication:function (callback) {


            callback(false);
        }

    };
});