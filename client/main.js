'use strict';

angular.module('emojitune.main', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'main.html',
        controller: 'MainCtrl'
    })
}])

.controller('MainCtrl', ['$scope', '$resource', function ($scope, $resource) {
    $scope.lol = 'lol';

    function onQuerySubmit() {
        $resource('https://api.spotify.com/v1/search?q=' + encodeURIComponent($scope.query) + '&type=track').get().$promise
            .then(function (result) {
                if (!result.tracks) {
                    throw new Error('Track not found');
                }
                var track = result.tracks.items[0];
                $scope.track = track;
                $scope.query = track.artists[0].name + ' – ' + track.name;
                $resource('http://localhost:3000/emojify').save({
                    track: track.name,
                    artist: track.artists[0].name
                }).$promise
                    .then(function (result) {
                        console.log(result);
                        $scope.lyrics = result.response;
                    })
            });
    }

    $scope.submitQuery = onQuerySubmit;

}])

.directive('spotifyWidget', function () {
    return {
        template: '<iframe width="300" height="380" frameborder="0" allowtransparency="true">',
        scope: {
            track: '='
        },
        link: function (scope, $el, attrs) {
            function updateTrack() {
                if (scope.track) {
                    $el.find('iframe').attr('src', 'https://embed.spotify.com/?uri=spotify:track:' + scope.track);
                }
            }
            scope.$watch('track', updateTrack);
            updateTrack();
        }
    };
});