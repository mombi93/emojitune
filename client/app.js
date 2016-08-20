'use strict';

angular.module('emojitune')
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}]);
