app.component('userBox', {
    bindings: {
        user:'=?'
    },
    transclude:true,
    controller: function ($scope,$timeout,AuthenticationFactory) {

        var self = this;
        self.$onInit=function () {




        };



    },
    templateUrl:"components/user-box/view.html"
});