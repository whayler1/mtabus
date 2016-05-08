'use strict';

describe('Controller: BusStopsCtrl', function () {

  // load the controller's module
  beforeEach(module('mtabusApp'));

  var BusStopsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusStopsCtrl = $controller('BusStopsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
