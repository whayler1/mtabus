'use strict';

angular.module('mtabusApp')
  .controller('NavbarController', function(
    $scope,
    $rootScope,
    $state,
    navbar
  ) {

    $scope.navbar = navbar;

    $scope.onToggleListView = () => $rootScope.$emit('toggle-show-list-view');
    $scope.onToggleShowMenu = () => $rootScope.$emit('toggle-show-menu');

    $scope.onSearchClick = () => {
      navbar.inputs.search = '';
    };

    $scope.searchSubmit = _.debounce(() => {
      $state.go('routes.search', { search: navbar.inputs.search });
    }, 750);
  });
