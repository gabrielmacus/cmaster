app.factory('Modules', function($http,HttpErrorHandler) {


    return {

        "post":function (ctrl) {

            ctrl.onProcess=function (item,callback) {
                if(item._related.images[0])
                {
                    item.image = item._related.images[0].src;
                }

                callback();
            }
            ctrl.title="Listado de noticias";
            ctrl.gridMode = 1920;
            ctrl.properties = {"image":{type:"media",label:"Imagen"},"title":"Titulo"};
            ctrl.query.populate = [{file:{path:'images'}}];
        }

    };

});