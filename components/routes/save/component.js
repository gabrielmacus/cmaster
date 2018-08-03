app.component('save', {
    bindings:
        {
            module:'<',
            id:'<',
            onSave:'<',
            onSaveAll:'<'
          //  items:'<'
        },
    controller:function (REST,Modules,$state,$scope,ToastStack) {
        var self = this;
        self.item = {};

        self.query={};
        self.cancel=function () {
            $state.go("list",{module:self.module});
        }
        self.loadItem=function (id) {

            var restClient = new REST(self.module);
            restClient.readById(id,self.query)
                .then(function (item) {
                    self.item = item;
                });

        };
        self.saveItem=function (dontRedirectOnEnd,success,error) {

            ToastStack.push({
                type:'info',
                text:'Guardando elemento...'
            },'saving');

            var restClient = new REST(self.module);
            self.validationErrors=false;
            self.loading =true;
            restClient.save(self.item,function (item) {
                self.loading=false;

                if(!self.onSave)
                {
                    ToastStack.remove("saving");
                    ToastStack.push({
                        type:'success',
                        text:'Elemento guardado con éxito',
                        timeout:2000
                    });
                }

                if(self.onSave)
                {


                    self.onSave(item);
                }
                else if(!dontRedirectOnEnd)
                {
                    $state.go("list",{module:self.module});
                }

                if(success)
                {
                    success();
                }



            },function (validationErrors) {
                ToastStack.remove("saving");
                self.loading=false;

                ToastStack.push({
                    type:'error',
                    text:'Hay errores de validación. Verifique los campos',
                    timeout:5000
                },'validation');
                    self.validationErrors = validationErrors;

                    if(error)
                    {
                        error();
                    }


            },self.multipart);


        };
        self.saveMultipleItems=function (k) {
            k = !k?0:k;
            if(self.items[k])
            {

                self.item = self.items[k];

                self.saveItem(true,function () {

                    self.saveMultipleItems(k+1);
                });
            }
            else {

                if(!self.onSaveAll)
                {
                    ToastStack.remove("saving");
                    ToastStack.push({
                        type:'success',
                        text:'Múltiples elementos guardados con éxito',
                        timeout:2000
                    });
                    $state.go("list",{module:self.module});
                }
                else {
                    self.onSaveAll();
                }

            }

        };

        this.$onInit=function () {



            self.multipart=false;
            if(Modules[self.module+"-save"])
            {
                //Overwrites desired default values
                Modules[self.module+"-save"](self,$scope);
            }

            if(self.id){
                self.loadItem(self.id);
            }



         };
    },
    templateUrl:"components/routes/save/view.html"
});