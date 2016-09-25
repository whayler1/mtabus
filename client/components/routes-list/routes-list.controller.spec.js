'use strict';

describe('Controller: RoutesListCtrl', function () {

  // load the controller's module
  beforeEach(module('mtabusApp'));

  var RoutesListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RoutesListCtrl = $controller('RoutesListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
