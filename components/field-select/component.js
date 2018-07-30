app.component('fieldSelect', {
        bindings: {
            label:'=',
            errors:'=?',
            model:'=?',
            options:'@'

        },
    //transclude:true,
        controller: function () {


        },
    templateUrl:"components/field-select/view.html"
    });