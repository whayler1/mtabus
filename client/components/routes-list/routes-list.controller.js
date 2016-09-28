'use strict';

angular.module('mtabusApp')
  .controller('RoutesListCtrl', function ($log, $scope) {
    $log.log('%c $scope.search', 'background:aqua', $scope.search);
  });
