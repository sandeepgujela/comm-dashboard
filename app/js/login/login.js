angular.module('login', []).config(function($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'login/login.tpl',
        controller: 'LoginCtrl'
    });
}).controller('LoginCtrl', function() {
    console.log("inside LoginCtrl");
});

