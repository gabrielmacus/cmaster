app.component('fieldOptions', {
        bindings: {
            label:'=',
            model:'=',
            options:'=',
            optionLabel:'=',
            optionValue:'=',
            multiple:'='

        },
        controller: function () {

            this.generateId =function (label) {
                return window.btoa(unescape(encodeURIComponent(label+" "+this.label)));
            }

            this.updateModel=function () {
                this.model = [];
                for(var k in this.selected)
                {

                    if(this.selected[k])
                    {

                        this.model.push(this.selected[k]);
                    }
                }
            }


        },
    templateUrl:"components/field-options/view.html"
    });