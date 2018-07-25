app.component('login', {
    bindings:
        {

        },
    controller:function (REST,Modules,$state,AuthenticationFactory) {
        var self = this;
        self.login=function () {
            self.loading=true;
            AuthenticationFactory.Login(self.user,function(){
                    self.loading=false;
                $state.go('home');

                },function () {
                self.loading=false;
            });
        }

    },
    templateUrl:"components/routes/login/view.html"
});