app.component('field', {
        bindings: {
            type: '=',
            placeholder:'=',
            label:'=',
            model:'=',
            errors:'=?'
        },
        transclude:true,
        controller: function () {
            this.type = (!this.type)?"text":this.type;

        },
    templateUrl:"components/field/view.html"
    });