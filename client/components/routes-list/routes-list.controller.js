'use strict';

angular.module('mtabusApp')
  .controller('RoutesListCtrl', function ($log, $scope) {
    $log.log('%c $scope.routes', 'background:aqua', $scope.routes);
  });
