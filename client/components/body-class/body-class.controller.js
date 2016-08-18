'use strict';

angular.module('mtabusApp')
  .controller('BodyClassCtrl', function ($scope, $rootScope, $log) {
    
    $scope.shouldShowListView = false;

    $rootScope.$on('toggle-show-list-view', (e, shouldShowListView) => {
      if(typeof shouldShowListView === 'boolean') {
        $scope.shouldShowListView = shouldShowListView;
      }else {
        $scope.shouldShowListView = !$scope.shouldShowListView;
      }
    });
  });
