'use strict';

describe('Controller: BusStopListCtrl', function () {

  // load the controller's module
  beforeEach(module('mtabusApp'));

  var BusStopListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusStopListCtrl = $controller('BusStopListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
