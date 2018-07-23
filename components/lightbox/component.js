app.component('lightbox', {
    transclude:true,
    bindings:
        {
          opened:"="
        },
    controller:function ($scope) {

        var self =this;
        self.$onInit=function () {
            $scope.$watch(this.opened,self.track);

            self.$onChanges=function (changes) {
                console.log(changes);
            }
        }
        self.track=function () {
            console.log("A");
        }
    },
    templateUrl:"components/lightbox/view.html"
});