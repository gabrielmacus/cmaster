app.component('save', {
    bindings:
        {
            module:'<',
            id:'<'
          //  items:'<'
        },
    controller:function (REST,Modules,$state) {
        var self = this;
        self.item = {};

        self.cancel=function () {
            $state.go("list",{module:self.module});
        }
        self.loadItem=function (id) {

            var restClient = new REST(self.module);
            restClient.readById(id)
                .then(function (item) {
                    self.item = item;
                });

        };
        self.saveItem=function () {
            var restClient = new REST(self.module);
            self.loading =true;
            restClient.save(self.item,function (validationErrors) {

                self.loading=false;
                    self.validationErrors = validationErrors;

            },self.multipart)
                .then(function (item) {
                    self.loading=false;
                    console.log(item);
                });


        };
        self.saveMultipleItems=function (k) {

            k = !k?0:k;



            if(self.items[k])
            {

                self.item = self.items[k];
                console.log(self.item);
                self.saveItem().then(function (item) {

                    self.saveMultipleItems(k+1);
                });
            }

        };

        this.$onInit=function () {

            self.multipart=false;
            if(Modules[self.module+"-save"])
            {
                //Overwrites desired default values
                Modules[self.module+"-save"](self);
            }

            if(self.id){
                self.loadItem(self.id);
            }



         };
    },
    templateUrl:"components/routes/save/view.html"
});