'use strict';

angular.module('emojitune')

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'main.html',
        controller: 'MainCtrl'
    })
}])

.controller('MainCtrl', ['scope', function () {

}]);