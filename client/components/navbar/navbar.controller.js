'use strict';

angular.module('mtabusApp')
  .controller('NavbarController', function(
    $scope,
    $rootScope,
    $document
  ) {

    $scope.onToggleListView = () => $rootScope.$emit('toggle-show-list-view');
  });
