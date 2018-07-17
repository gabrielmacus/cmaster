'use strict';

// Declare app level module which depends on views, and components
var app =  angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'myApp.home'
])
app.filter('trustUrl', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
});

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/'});
}]);
