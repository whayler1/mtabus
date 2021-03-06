'use strict';

angular.module('mtabusApp')
  .controller('BodyClassCtrl', function ($scope, $rootScope, $log, analytics) {

    $scope.shouldShowListView = false;
    $scope.shouldShowMenu = false;

    $rootScope.$on('toggle-show-list-view', (e, shouldShowListView) => {
      if(typeof shouldShowListView === 'boolean') {
        $scope.shouldShowListView = shouldShowListView;
      }else {
        $scope.shouldShowListView = !$scope.shouldShowListView;
      }
    });

    $rootScope.$on('toggle-show-menu', (e, shouldShowMenu) => {
      if(typeof shouldShowMenu === 'boolean') {
        $scope.shouldShowMenu = shouldShowMenu;
        analytics.track('show-menu');
      }else {
        $scope.shouldShowMenu = !$scope.shouldShowMenu;
        analytics.track('hide-menu');
      }
    });
  });
