app.component('list', {
    bindings:
        {
            module:'<',
            selectedItems:'=?'
          //  items:'<'
        },
    controller:function (REST,Modules,$state) {

        var self = this;
        self.goToCreate=function () {
            $state.go("create",{module:self.module});
        }
        self.changePage=function (page) {
            self.query.p = page;
            return self.list();
        };
        self.list=function () {
            var restClient = new REST(self.module);

            return restClient.list(self.query).then(function (data) {
                self.items = [];
                for(var k in data.results)
                {
                    if(self.onProcess)
                    {
                        self.onProcess(data.results[k],function () {

                            self.items.push(data.results[k]);

                        });
                    }
                    else
                    {
                        self.items.push(data.results[k]);
                    }
                }

                self.pagination = data.pagination;

            });
        };
        self.delete=function (item) {
            var restClient = new REST(self.module);
            return restClient.delete(item.id).then(function () {
                self.list();
            })
        }
        this.$onInit=function () {


            //Default values
            self.query={p:1};
            self.items = [];
            self.gridMode = 768;
            self.pagerOffset = 4;
            self.individualActions = [{'label':'Eliminar','icon':'fas fa-trash','action':function (item) {

                self.deleteItem=function () {
                    self.deleteItem=false;
                    self.delete(item);


                }

            }},{'label':'Editar','icon':'fas fa-pen','action':function (item) {
                $state.go("update",{module:self.module,id:item.id});

            }},{'label':'Ver detalles','icon':'fas fa-info'}];

            if(Modules[self.module])
            {
                //Overwrites desired default values
                Modules[self.module](self);
            }

            self.list();


         }
    },
    templateUrl:"components/routes/list/view.html"
});