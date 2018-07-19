app.factory('Modules', function($http,HttpErrorHandler) {


    return {

        "file":function (ctrl) {
            ctrl.properties = {"src":{label:"Vista previa",type:"media"},"name":"Nombre"};
            ctrl.gridMode = 1920;
            ctrl.title="Listado de archivos";
        },

        "post":function (ctrl) {

            ctrl.onProcess=function (item,callback) {

                item.image = false;
                if(item._related && item._related.images)
                {
                    item.image = item._related.images[0].src;
                }

                callback();
            }
            ctrl.title="Listado de noticias";
            ctrl.gridMode = 1920;
            ctrl.properties = {"image":{type:"media",label:"Imagen"},"title":"Titulo"};
            ctrl.query.populate = [{file:{path:'images'}}];
        },
        "post-save":function (ctrl) {

        }

    };

});