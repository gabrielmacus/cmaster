app.component('userBox', {
    bindings: {
        user:'=?'
    },
    transclude:true,
    controller: function ($scope,$timeout,AuthenticationFactory) {

        var self = this;
        self.$onInit=function () {

            self.user = !self.user? AuthenticationFactory.user:self.user;

        };



    },
    templateUrl:"components/user-box/view.html"
});