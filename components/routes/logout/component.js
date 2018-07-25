app.component('logout', {
    bindings:
        {

        },
    controller:function (REST,Modules,$state,AuthenticationFactory) {

        AuthenticationFactory.Logout(function () {

            $state.go("login");

        });

        },
    templateUrl:"components/routes/save/view.html"
});