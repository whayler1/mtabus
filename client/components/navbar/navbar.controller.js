'use strict';

angular.module('mtabusApp')
  .controller('NavbarController', function(
    $scope,
    $document
  ) {

    $scope.isLeftNavHidden = true;
    $scope.toggleLeftNav = () => {
      $scope.isLeftNavHidden = !$scope.isLeftNavHidden;
      if(_.hasIn($document, 'body')) {
        
      }
    }
  });
