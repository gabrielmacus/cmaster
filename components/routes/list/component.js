app.component('list', {
    bindings:
        {
            module:'<'
          //  items:'<'
        },
    controller:function (REST,Modules) {
        var self = this;
        this.$onInit=function () {

            var restClient = new REST(self.module);
            self.query={};
            self.items = [];
            self.gridMode = 768;
            self.individualActions = [{'label':'Eliminar','icon':'fas fa-trash'},{'label':'Editar','icon':'fas fa-pen'}];

            if(Modules[self.module])
            {
                Modules[self.module](self);
            }

            restClient.list(self.query).then(function (data) {

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
         }
    },
    templateUrl:"components/routes/list/view.html"
});