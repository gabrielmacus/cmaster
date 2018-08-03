app.component('lightbox', {
    transclude:true,
    bindings:
        {
          opened:"="
        },
    controller:function ($scope) {

        var self =this;
        self.$onInit=function () {


        }

    },
    templateUrl:"components/lightbox/view.html"
});

