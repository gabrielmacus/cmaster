app.factory('HttpErrorHandler', function() {


    return function (e) {
        console.log(e);
        alert('Error');
        //TODO: Add code
    };
});