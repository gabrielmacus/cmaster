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
            String.prototype.bool = function() {
                return (/^true$/i).test(this);
            };
            var self =this;
            this.generateId =function (label) {
                return window.btoa(unescape(encodeURIComponent(label+" "+this.label)));
            }

            self.selected = {};

            self.updateModel=function () {


                if(this.model !== false)
                {
                    self.selected[this.id] = this.model;
                }
                else
                {
                    delete self.selected[this.id];
                }

                self.model =[];

                for(var k in self.selected)
                {

                    if(self.selected[k])
                    {

                        self.model.push(self.selected[k]);
                    }
                }

            }


        },
    templateUrl:"components/field-options/view.html"
    });