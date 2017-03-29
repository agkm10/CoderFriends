angular.module('githubApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: './templates/login.html',
                controller: 'mainCtrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: './templates/home.html',
                controller: 'mainCtrl'
            })
            .state('friend', {
                url: '/friend',
                templateUrl: './templates/friend.html',
                controller: 'mainCtrl'
            })
        $urlRouterProvider
            .otherwise('/');
    });
