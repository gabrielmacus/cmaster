app.component('dataset', {
        bindings: {
            properties:'=',
            items:'=',
            individualActions:'=',
            generalActions:'='
        },
        controller: function () {
            this.$onInit=function () {

            }


        },
    templateUrl:"components/dataset/view.html"
    });