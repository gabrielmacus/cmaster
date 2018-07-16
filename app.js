'use strict';

// Declare app level module which depends on views, and components
var app =  angular.module('myApp', [
    'ngRoute',
    'myApp.home'
])

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/'});
}]);
