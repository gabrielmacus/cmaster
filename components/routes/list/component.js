app.component('list', {
    bindings:
        {
            module:'<',
            selectedItems:'=',
            singleSelection:'=',
            toolbarActions:'<?'
        },
    controller:function (REST,Modules,$state,$timeout,$scope,$rootScope,ToastStack) {

        /*
        ToastStack.push({
            text:"Hey! Soy un toast...",
            type:"error",
        });*/
        /*
        $rootScope.ToastStack = [
            {
                text:"Hey! Soy un toast...",
                type:"error",
            },
            {
                text:"Hey! Soy un toast...",
                type:"info",
                timeout:5000
            },
            {
                text:"Hey! Soy un toast...",
                type:"warning",
                timeout:4000
            },
            {
                text:"Hey! Soy un toast...",
                type:"success",
                timeout:3000
            }
        ];*/
        var self = this;
        self.goToCreate=function () {
            $state.go("create",{module:self.module});
        }
        self.changePage=function (page) {
            self.query.p = page;
            return self.list();
        };
        self.list=function (onSuccess) {
            var restClient = new REST(self.module);

            self.loadingItems=true;

            restClient.list(self.query,function (data) {
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

                self.loadingItems=false;

               if(onSuccess)
               {
                   onSuccess();
               }

            },function () {
                self.loadingItems=false;
            });
        };
        self.delete=function (item,onSuccess) {


            ToastStack.push({
              type:'info',
              text:'Eliminando elemento...'
            },'deleting');

            var restClient = new REST(self.module);
            item._loading=true;

            restClient.delete(item.id,function () {
                ToastStack.remove("deleting");
                if(!onSuccess)
                {
                    //ToastStack.remove('deleting');

                    ToastStack.push({
                      type:'success',
                      text:'Elemento eliminado',
                      timeout:2000
                    },'deleted');

                    self.list();
                }
                else {
                    onSuccess();
                }

            });
        };
        self.deleteMultipleItems=function (items,k,onEnd) {

            k = k?k:0;
            if(items[k])
            {
                self.delete(items[k],function () {

                    items[k]._deleted= true;
                        items[k]._loading=false;

                       self.deleteMultipleItems(items,k+1);
                    });
            }
            else
            {
                if(onEnd)
                {
                    onEnd();
                }
                else {


                    ToastStack.push({
                        type:'success',
                        text:'Múltiples elementos eliminados',
                        timeout:2000
                    },'deleted');


                    self.list();
                }
            }

        }
        self.getSelectedItems=function () {

          return  (self.items)?self.items.filter(function (t) { return t._selected }):[];

        };
        self.selectedItems = self.getSelectedItems();

        this.$onInit=function () {

            //Default values
            self.query={p:1};
            self.items = [];
            self.gridMode = 768;
            self.pagerOffset = 4;
            self.individualActions = [{'label':'Eliminar','icon':'fas fa-trash','action':function (item) {


                $rootScope.Lightbox = {
                    opened:true,
                    title:"¿Desea eliminar el elemento?",
                    actions:[
                        {"text":"Si","action":function () {
                            $rootScope.Lightbox = false;
                            self.delete(item);
                        }},
                        {
                            "text":"No","action":function () {
                            $rootScope.Lightbox = false;
                        }
                        }

                    ]

                };


            }},{'label':'Editar','icon':'fas fa-pen','action':function (item) {
                $state.go("update",{module:self.module,id:item.id});

            }},{'label':'Ver detalles','icon':'fas fa-info'}];

            self.defaultToolbarActions =[
                {id:'create','label':'Crear','icon':'fas fa-file','action':self.goToCreate},
                {id:'delete','label':function(){return 'Eliminar ('+self.getSelectedItems().length+')'},'icon':'fas fa-trash','action':function () {

                    $rootScope.Lightbox = {
                        opened:true,
                        title:"¿Desea eliminar "+self.getSelectedItems().length+" elemento/s?",
                        actions:[
                            {"text":"Si","action":function () {
                                $rootScope.Lightbox = false;
                                self.deleteMultipleItems(self.getSelectedItems(),0,function () {
                                    for(var k in self.items)
                                    {
                                        self.items[k]._selected=false;
                                    }
                                });
                            }},
                            {
                                "text":"No","action":function () {
                                    $rootScope.Lightbox = false;
                                }
                            }

                        ]



                    };





                },'visible':function () {

                    return self.getSelectedItems().length;//(self.selectedItems && self.selectedItems.length);

                }},
                {id:'deselect-all','label':'Desmarcar todo','icon':'fas fa-times','action':function () {

                    for(let k in self.items)
                    {
                        self.items[k]._selected = false;

                    }

                },'visible':function () {

                    return self.items.length && self.items.length == self.getSelectedItems().length;

                }},
                {id:'select-all','label':'Marcar todo','visible':function () {

                    return self.items.length && self.items.length != self.getSelectedItems().length;

                },'icon':'fas fa-check-double','action':function () {
                    for(let k in self.items)
                    {
                        self.items[k]._selected = true;

                    }
                }}
                ];

            if(self.toolbarActions && angular.isFunction(self.toolbarActions))
            {

              self.toolbarActions =  self.toolbarActions(self);
            }
            else {
                self.toolbarActions= self.defaultToolbarActions;
            }


            if(Modules[self.module])
            {
                //Overwrites desired default values
                Modules[self.module](self);
            }

            for(var k in self.toolbarActions)
            {
                //Shown by default
                if(!self.toolbarActions[k].visible)
                {
                    self.toolbarActions[k].visible=function () {
                        return true;
                    }
                }
                if(!angular.isFunction(self.toolbarActions[k].label))
                {

                    let label =self.toolbarActions[k].label;
                    self.toolbarActions[k].label =function () {
                        return label;
                    }
                }
            }

            self.list();


         }
    },
    templateUrl:"components/routes/list/view.html"
});