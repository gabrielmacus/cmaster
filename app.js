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
    //$urlServiceProvider.rules.otherwise({ state: 'userlist' });

    $stateProvider.state('home', {
        url: '/',
        component: 'home',
        resolve: {

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





});
app.run(function () {
    
});