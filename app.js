'use strict';

// Declare app level module which depends on views, and components
var app =  angular.module('myApp', [
    'ui.router',
    'ngAnimate'
])
//Filters
app.filter('trustUrl', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
});

//Router config
app.config(function($stateProvider, $urlServiceProvider) {
    $urlServiceProvider.rules.otherwise({ state: 'home' });


    $stateProvider.state('update', {
        url: '/:module/save/:id',
        component: 'save',
        resolve: {

            module:function ($transition$) {
                return $transition$.params().module;
            },
            id:function ($transition$) {
                return $transition$.params().id;
            }
            /*
            items:function (REST) {
                var client = new REST();
                client.url = "/libs/api/post/";
                return client.list();
            }*/

        }
    });

    $stateProvider.state('create', {
        url: '/:module/save',
        component: 'save',
        resolve: {

            module:function ($transition$) {
                return $transition$.params().module;
            }
            /*
            items:function (REST) {
                var client = new REST();
                client.url = "/libs/api/post/";
                return client.list();
            }*/

        }
    });



    $stateProvider.state('list', {
        url: '/:module',
        component: 'list',
        resolve: {

            module:function ($transition$) {
                return $transition$.params().module;
            }
            /*
            items:function (REST) {
                var client = new REST();
                client.url = "/libs/api/post/";
                return client.list();
            }*/
            
        }
    });


    $stateProvider.state('home', {
        url: '/',
        component: 'home',
        resolve: {

        }
    });


});
app.run(function () {
    
});