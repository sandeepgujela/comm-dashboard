angular.module('app', ['ui.router', 'templates', 'login', 'dashboard','angularjs-datetime-picker','constants']).config(function($locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/dashboard');
    })
    .run(function() {});
