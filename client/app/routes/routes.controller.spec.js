'use strict';

describe('Component: RoutesComponent', function () {

  // load the controller's module
  beforeEach(module('mtabusApp'));

  var RoutesComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RoutesComponent = $componentController('RoutesComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
