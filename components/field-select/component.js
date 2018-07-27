app.component('fieldSelect', {
        bindings: {
            label:'=',
            model:'=',
            options:'@',
            errors:'=?'

        },
        controller: function () {


        },
    templateUrl:"components/field-select/view.html"
    });