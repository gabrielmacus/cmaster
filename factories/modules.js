app.factory('Modules', function($http,HttpErrorHandler,AuthenticationFactory,REST,$timeout) {


    return {

        "file":function (ctrl) {
            ctrl.properties = {"src":{label:"Vista previa",type:"media"},"name":"Nombre"};
            ctrl.gridMode = 1920;
            ctrl.title="Listado de archivos";
        },
        "file-save":function (ctrl,$scope) {

            ctrl.multipart=true;
        },
        "news":function (ctrl) {

            ctrl.onProcess=function (item,callback) {

                item.image = false;
                if(item._related && item._related.images)
                {
                    item.image = item._related.images[0].src;
                }

                callback();
            }
            ctrl.title="Listado de noticias";
            ctrl.gridMode = 768;
            ctrl.properties = {"image":{type:"media",label:"Imagen"},"title":"Titulo"};
            ctrl.query.populate = [{file:{path:'images'}}];
        },
        "news-save":function (ctrl) {
            ctrl.query = !ctrl.query?{}:ctrl.query;
            ctrl.query.populate = [{file:{path:'images'}}];

        },
        "user-save":function (ctrl) {
            ctrl.query.populate = [{role:{path:'role'}}];
        },
        "user":function (ctrl) {

            ctrl.title="Listado de usuarios";
            console.log(AuthenticationFactory.user.id);
            ctrl.query.filter={id:{not:[AuthenticationFactory.user.id]}};
            ctrl.properties = {"id":"ID","username":"Nombre de usuario",'name':'Nombre','surname':'Apellido'};

        },
        "role-save":function (ctrl,$scope) {

            $scope.$watch("$ctrl.item",function (newVal) {
                if(newVal && newVal._related && newVal._related.permissions)
                {
                    for(var k in newVal._related.permissions)
                    {
                        if(newVal._related.permissions[k].actions && typeof newVal._related.permissions[k].actions !== "object")
                        {
                            newVal._related.permissions[k].actions = JSON.parse(newVal._related.permissions[k].actions);
                        }
                    }

                }
            })

            ctrl.query.populate =[{module:{path:"permissions"}}];
        },
        "role":function (ctrl) {

            ctrl.title="Listado de roles";
            ctrl.properties = {"id":"ID","name":"Nombre"};


        },
        /*
        "permission":function (ctrl) {
            ctrl.title="Listado de permisos";
            ctrl.properties = {"id":"ID","module":"Módulo","action":"Acción"};

        },
        "permission-save":function (ctrl,$scope) {


            var restClient = new REST(ctrl.module);

            restClient.get("modules/",function (data) {
               ctrl.modules = data;

            });

        },*/
        "module":function (ctrl) {
            ctrl.properties = {"name":"Módulo"};

            ctrl.individualActions = [];
           var idx =  ctrl.toolbarActions.findIndex(function (e) {
                return e.id == "select";
            });
           if(idx > -1)
           {
               ctrl.toolbarActions = [ctrl.toolbarActions[idx]];
           }



        }

    };

});