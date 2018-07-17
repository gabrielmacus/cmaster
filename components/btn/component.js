app.component('btn', {
        bindings: {
            type:'=',
            loading:'='
        },
        transclude:true,
        controller: function () {

            var self =this;
            self.$onInit=function () {
                self.type = (!self.type)?"button":self.type;
            }


        },
    templateUrl:"components/btn/view.html"
    });