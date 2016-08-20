'use strict';

angular.module('emojitune', ['ngRoute', 'emojitune.main'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}]);
