app.component('login', {
    bindings:
        {

        },
    controller:function (REST,Modules,$state,AuthenticationFactory) {
        var self = this;
        self.login=function () {
            AuthenticationFactory.Login(self.user)
                .then(function (response) {
                    console.log(response);
                });
        }

    },
    templateUrl:"components/routes/login/view.html"
});