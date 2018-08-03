app.factory('HttpErrorHandler', function(ToastStack) {


    return function (e) {

        switch (e.status){
            case 403:
            case 401:

                ToastStack.push(
                    {
                        type:'warning',
                        text:JSON.parse(e.data),
                        timeout:4000

                    },'httpError');


                break;

            case 404:

                ToastStack.push(
                    {
                        type:'error',
                        text:'Oops. Parece que el módulo no existe',
                        timeout:4000

                    },'httpError');


                break;

            default:

                ToastStack.push(
                    {
                        type:'error',
                        text:'Error desconocido. Contacte al administrador',
                        timeout:4000

                    },'unknownHttpError');


                break;
        }


        console.log(e);
        //alert('Error');
        //TODO: Add code
    };
});