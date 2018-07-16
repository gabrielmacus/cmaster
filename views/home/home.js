'use strict';

angular.module('myApp.home', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeController'
        });
    }])
    .controller('HomeController',function() {

        alert('loaded');
    });