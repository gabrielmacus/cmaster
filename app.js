'use strict';

// Declare app level module which depends on views, and components
var app =  angular.module('myApp', [
    'ui.router',
    'ngAnimate',
    'ngCookies'
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


    $stateProvider.state('login', {
        url: '/login',
        component: 'login',
        resolve: {

        }
    });

    $stateProvider.state('home', {
        url: '/',
        component: 'home',
        authentication:true,
        resolve: {

        }
    });


    $stateProvider.state('update', {
        url: '/:module/save/{id:int}',
        component: 'save',
        authentication:true,
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
    $stateProvider.state('logout', {
        url: '/logout',
        component: 'logout',
        resolve: {

        }
    });
    $stateProvider.state('create', {
        url: '/:module/save',
        component: 'save',
        authentication:true,
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
        authentication:true,
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
app.run(function ($transitions,AuthenticationFactory) {



    $transitions.onStart({}, function(transition) {
        console.log();

        if(transition.to().authentication)
        {
            AuthenticationFactory.CheckAuthentication(function (isAuthenticated) {
                if ( !isAuthenticated) {
                    console.log(transition);
                    // Remember toState and toStateParams.
                    //$rootScope.toState = toState.name;
                    //$rootScope.toStateParams = toParams;
                    // Redirect to login page
                    transition.router.stateService.transitionTo('login');
                    return false;
                }
            });

        }


    });

});