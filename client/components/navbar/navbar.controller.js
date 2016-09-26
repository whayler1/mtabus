'use strict';

angular.module('mtabusApp')
  .controller('NavbarController', function(
    $scope,
    $rootScope,
    $element
  ) {

    $scope.onToggleListView = () => $rootScope.$emit('toggle-show-list-view');
    $scope.onToggleShowMenu = () => $rootScope.$emit('toggle-show-menu');
  });
