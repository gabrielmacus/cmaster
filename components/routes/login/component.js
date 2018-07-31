app.component('login', {
    bindings:
        {

        },
    controller:function (REST,Modules,$state,AuthenticationFactory) {
        var self = this;
        self.login=function () {
            self.loginError = false;
            self.loading=true;
            AuthenticationFactory.Login(self.user,function(){
                    self.loading=false;
                $state.go('home');



                },function (e) {
                console.log(e);
                if(e.status == 400)
                {
                    self.loginError = 'Los datos de ingreso son incorrectos. Verifique usuario y/o contraseña';
                }
                else {
                    self.loginError = 'Error al ingresar a su cuenta. Verifique que se encuentre activa o contacte un administrador';
                }
                self.loading=false;
            });
        }

    },
    templateUrl:"components/routes/login/view.html"
});