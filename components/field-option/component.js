app.component('fieldOption', {
        bindings: {
            label:'=',
            model:'=?',
            id:'=',
            onChange:'=',
            value:'='

        },
        controller: function ($scope,$timeout) {

            var self = this;

            self.$onInit=function () {


                self.model = !self.model?false:self.model;

                $scope.$watch('$ctrl.model',function (newVal) {

                   console.log(newVal);

                });

                self.toggleValue=function () {


                    self.model = (self.model === false)?self.value:false;

                    if(self.onChange)
                    {
                        self.onChange(self.model);
                    }
                    console.log("Toggling",self.model);
                };

            }





        },
    templateUrl:"components/field-option/view.html"
    });