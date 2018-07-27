app.component('validationErrors', {
        bindings: {
            errors:'=?'
        },
        transclude:true,
        controller: function ($scope,$timeout) {


            var self =this;


        },
    templateUrl:"components/validation-errors/view.html"
    });