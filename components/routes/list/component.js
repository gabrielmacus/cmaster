app.component('list', {
    bindings:
        {
            module:'<'
          //  items:'<'
        },
    controller:function (REST) {
        var self = this;
        this.$onInit=function () {

            var restClient = new REST(self.module);
            var query = {};
            query.populate = [{file:{path:"images"}}];

            restClient.list(query).then(function (data) {
              self.items = data.results;

              for(var k in self.items)
              {
                  self.items[]
              }

             });
         }
    },
    templateUrl:"components/routes/list/view.html"
});