'use strict';

angular.module('mtabusApp')
  .controller('NavbarController', function(
    $scope,
    $rootScope,
    $state
  ) {

    $scope.inputs = {
      search: $scope.search ? $scope.search : ''
    };

    $scope.onToggleListView = () => $rootScope.$emit('toggle-show-list-view');
    $scope.onToggleShowMenu = () => $rootScope.$emit('toggle-show-menu');

    $scope.onSearchChange = _.debounce(() => {
      console.log('change', $scope.inputs.search);
      $state.go('routes.search', { search: $scope.inputs.search });
    }, 750);
  });
